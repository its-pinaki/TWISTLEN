import AWS from "aws-sdk";
import { v4 as uuidv4 } from 'uuid';

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const CARTS_TABLE = process.env.CARTS_TABLE;
const PRODUCTS_TABLE = process.env.PRODUCTS_TABLE;

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Session-Id",
  "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS"
};

export const lambdaHandler = async (event) => {
  try {
    const method = event.requestContext.http.method;
    const path = event.requestContext.http.path;
    const headers = event.headers;
    
    // Extract user/session info
    const userId = headers.Authorization ? headers.Authorization.split(' ')[1] : null;
    const sessionId = headers['X-Session-Id'] || uuidv4(); // Generate new session ID if not provided
    
    if (!userId && !sessionId) {
      return errorResponse(400, 'Either Authorization header or X-Session-Id required');
    }

    switch (method) {
      case 'OPTIONS':
        return { statusCode: 200, headers, body: '' };
      
      case 'GET':
        if (path === '/cart') {
          return await getCart(userId, sessionId);
        }
        break;
      
      case 'POST':
        if (path === '/cart/items') {
          return await updateCart(event, userId, sessionId, 'add');
        } else if (path === '/cart/transfer') {
          return await transferCart(event, sessionId);
        }
        break;
      
      case 'PUT':
        if (path === '/cart/items') {
          return await updateCart(event, userId, sessionId, 'update');
        }
        break;
      
      case 'DELETE':
        if (path === '/cart/items') {
          return await updateCart(event, userId, sessionId, 'remove');
        } else if (path === '/cart') {
          return await clearCart(userId, sessionId);
        }
        break;
      
      default:
        return errorResponse(405, 'Method Not Allowed');
    }
    
    return errorResponse(404, 'Not Found');
  } catch (error) {
    console.error('Error:', error);
    return errorResponse(500, 'Internal Server Error', error);
  }
};

// Get or create cart
const getCart = async (userId, sessionId) => {
  const cartId = userId ? `user-${userId}` : `session-${sessionId}`;
  
  const result = await dynamoDB.get({
    TableName: CARTS_TABLE,
    Key: { cartId }
  }).promise();

  let cart = result.Item;
  
  if (!cart) {
    cart = {
      cartId,
      userId: userId || null,
      sessionId: userId ? null : sessionId,
      items: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    await dynamoDB.put({
      TableName: CARTS_TABLE,
      Item: cart
    }).promise();
  }
  
  // Enrich with product details
  cart.items = await enrichCartItems(cart.items);
  
  return successResponse(200, {
    cart,
    sessionId: cart.sessionId // Return sessionId for anonymous users
  });
};

// Update cart (add/update/remove items)
const updateCart = async (event, userId, sessionId, action) => {
  const { productId, quantity } = JSON.parse(event.body);
  
  if (!productId) {
    return errorResponse(400, 'Product ID is required');
  }
  
  // Verify product exists
  const product = await dynamoDB.get({
    TableName: PRODUCTS_TABLE,
    Key: { id: productId }
  }).promise();
  
  if (!product.Item) {
    return errorResponse(404, 'Product not found');
  }
  
  const cartId = userId ? `user-${userId}` : `session-${sessionId}`;
  let cart = await getCartById(cartId);
  
  if (!cart) {
    cart = {
      cartId,
      userId: userId || null,
      sessionId: userId ? null : sessionId,
      items: [],
      createdAt: new Date().toISOString()
    };
  }
  
  // Find existing item
  const itemIndex = cart.items.findIndex(item => item.productId === productId);
  
  switch (action) {
    case 'add':
      if (itemIndex >= 0) {
        cart.items[itemIndex].quantity += quantity || 1;
      } else {
        cart.items.push({
          productId,
          quantity: quantity || 1,
          addedAt: new Date().toISOString()
        });
      }
      break;
    
    case 'update':
      if (itemIndex < 0) return errorResponse(404, 'Item not in cart');
      cart.items[itemIndex].quantity = quantity;
      break;
    
    case 'remove':
      if (itemIndex < 0) return errorResponse(404, 'Item not in cart');
      cart.items.splice(itemIndex, 1);
      break;
  }
  
  cart.updatedAt = new Date().toISOString();
  
  await dynamoDB.put({
    TableName: CARTS_TABLE,
    Item: cart
  }).promise();
  
  // Return enriched cart
  cart.items = await enrichCartItems(cart.items);
  
  return successResponse(200, {
    message: 'Cart updated successfully',
    cart,
    sessionId: cart.sessionId
  });
};

// Transfer anonymous cart to user upon login
const transferCart = async (event, sessionId) => {
  const { userId } = JSON.parse(event.body);
  
  if (!userId) {
    return errorResponse(400, 'User ID is required');
  }
  
  // Get anonymous cart
  const sessionCartId = `session-${sessionId}`;
  const sessionCart = await getCartById(sessionCartId);
  
  if (!sessionCart || sessionCart.items.length === 0) {
    return successResponse(200, { 
      message: 'No cart items to transfer'
    });
  }
  
  // Get user cart
  const userCartId = `user-${userId}`;
  let userCart = await getCartById(userCartId);
  
  if (!userCart) {
    userCart = {
      cartId: userCartId,
      userId,
      sessionId: null,
      items: [],
      createdAt: new Date().toISOString()
    };
  }
  
  // Merge carts (prioritize user cart quantities for duplicates)
  const mergedItems = [...userCart.items];
  
  for (const sessionItem of sessionCart.items) {
    const existingItem = mergedItems.find(item => item.productId === sessionItem.productId);
    if (existingItem) {
      existingItem.quantity += sessionItem.quantity;
    } else {
      mergedItems.push(sessionItem);
    }
  }
  
  userCart.items = mergedItems;
  userCart.updatedAt = new Date().toISOString();
  
  // Save user cart and delete session cart
  await Promise.all([
    dynamoDB.put({
      TableName: CARTS_TABLE,
      Item: userCart
    }).promise(),
    dynamoDB.delete({
      TableName: CARTS_TABLE,
      Key: { cartId: sessionCartId }
    }).promise()
  ]);
  
  userCart.items = await enrichCartItems(userCart.items);
  
  return successResponse(200, {
    message: 'Cart transferred successfully',
    cart: userCart
  });
};

// Clear cart
const clearCart = async (userId, sessionId) => {
  const cartId = userId ? `user-${userId}` : `session-${sessionId}`;
  
  await dynamoDB.delete({
    TableName: CARTS_TABLE,
    Key: { cartId }
  }).promise();
  
  return successResponse(200, {
    message: 'Cart cleared successfully'
  });
};

// Helper to get cart by ID
const getCartById = async (cartId) => {
  const result = await dynamoDB.get({
    TableName: CARTS_TABLE,
    Key: { cartId }
  }).promise();
  
  return result.Item;
};

// Helper to enrich cart items with product details
const enrichCartItems = async (items) => {
  if (!items || items.length === 0) return [];
  
  const enrichedItems = [];
  
  for (const item of items) {
    const product = await dynamoDB.get({
      TableName: PRODUCTS_TABLE,
      Key: { id: item.productId }
    }).promise();
    
    if (product.Item) {
      enrichedItems.push({
        ...item,
        name: product.Item.title,
        price: product.Item.basePrice,
        discountedPrice: product.Item.discountedPrice,
        image: product.Item.mainImage,
        stock: product.Item.stockQuantity
      });
    }
  }
  
  return enrichedItems;
};

// Helper functions
const successResponse = (statusCode, body) => ({
  statusCode,
  headers,
  body: JSON.stringify(body)
});

const errorResponse = (statusCode, message, error = null) => ({
  statusCode,
  headers,
  body: JSON.stringify({ 
    message, 
    error: error ? error.message : null 
  })
});