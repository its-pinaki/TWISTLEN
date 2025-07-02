import AWS from "aws-sdk";
import { v4 as uuidv4 } from 'uuid';

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const ORDERS_TABLE = "Orders";
const PRODUCTS_TABLE = "ProductDetails";

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Session-Id",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS"
};

export const lambdaHandler = async (event) => {
  try {
    const method = event.requestContext.http.method;
    const path = event.requestContext.http.path;
    const headers = event.headers;
    
    // Extract user/session info
    const userId = headers.Authorization ? headers.Authorization.split(' ')[1] : null;
    const sessionId = headers['X-Session-Id'] || null;

    switch (method) {
      case 'OPTIONS':
        return { statusCode: 200, headers, body: '' };
      
      case 'POST':
        if (path === '/orders') {
          return await createOrder(event, userId, sessionId);
        }
        break;
      
      case 'GET':
        if (path.startsWith('/orders/')) {
          const orderId = event.pathParameters.orderId;
          return await getOrder(orderId, userId, sessionId);
        } else if (path === '/users/orders') {
          if (!userId) return errorResponse(401, 'Authentication required');
          return await getUserOrders(userId);
        } else if (path === '/session/orders') {
          if (!sessionId) return errorResponse(400, 'Session ID required');
          return await getSessionOrders(sessionId);
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

// Create order (supports both authenticated and anonymous users)
const createOrder = async (event, userId, sessionId) => {
  const orderData = JSON.parse(event.body);
  
  // Validate required fields
  if (!orderData.items || orderData.items.length === 0) {
    return errorResponse(400, 'At least one item is required');
  }
  if (!orderData.shippingAddress) {
    return errorResponse(400, 'Shipping address is required');
  }
  if (!orderData.paymentMethod) {
    return errorResponse(400, 'Payment method is required');
  }

  // Verify products exist and calculate totals
  const { items, totalAmount } = await verifyProductsAndCalculateTotal(orderData.items);
  
  const orderId = uuidv4();
  const now = new Date().toISOString();
  
  const order = {
    orderId,
    userId: userId || null,
    sessionId: userId ? null : sessionId, // Only store sessionId for anonymous users
    status: 'pending',
    createdAt: now,
    updatedAt: now,
    items,
    shippingAddress: orderData.shippingAddress,
    billingAddress: orderData.billingAddress || orderData.shippingAddress,
    contactInfo: orderData.contactInfo,
    paymentMethod: orderData.paymentMethod,
    paymentStatus: 'unpaid',
    subtotal: totalAmount.subtotal,
    tax: totalAmount.tax,
    shippingFee: totalAmount.shippingFee,
    discount: totalAmount.discount,
    total: totalAmount.total,
    notes: orderData.notes || ''
  };

  await dynamoDB.put({
    TableName: ORDERS_TABLE,
    Item: order
  }).promise();

  return successResponse(201, { 
    message: 'Order created successfully',
    orderId,
    order
  });
};

// Get order details (checks ownership)
const getOrder = async (orderId, userId, sessionId) => {
  const result = await dynamoDB.get({
    TableName: ORDERS_TABLE,
    Key: { orderId }
  }).promise();

  if (!result.Item) {
    return errorResponse(404, 'Order not found');
  }

  const order = result.Item;
  
  // Check authorization
  if ((userId && order.userId !== userId) || 
      (!userId && order.sessionId !== sessionId)) {
    return errorResponse(403, 'Not authorized to view this order');
  }

  return successResponse(200, order);
};

// Get orders for authenticated user
const getUserOrders = async (userId) => {
  const result = await dynamoDB.query({
    TableName: ORDERS_TABLE,
    IndexName: 'UserIdIndex',
    KeyConditionExpression: 'userId = :userId',
    ExpressionAttributeValues: {
      ':userId': userId
    },
    ScanIndexForward: false // Newest first
  }).promise();

  return successResponse(200, result.Items);
};

// Get orders for anonymous session
const getSessionOrders = async (sessionId) => {
  const result = await dynamoDB.query({
    TableName: ORDERS_TABLE,
    IndexName: 'SessionIdIndex',
    KeyConditionExpression: 'sessionId = :sessionId',
    ExpressionAttributeValues: {
      ':sessionId': sessionId
    },
    ScanIndexForward: false // Newest first
  }).promise();

  return successResponse(200, result.Items);
};

// Helper to verify products and calculate totals
const verifyProductsAndCalculateTotal = async (items) => {
  let subtotal = 0;
  const verifiedItems = [];
  
  for (const item of items) {
    const product = await dynamoDB.get({
      TableName: PRODUCTS_TABLE,
      Key: { id: item.productId }
    }).promise();
    
    if (!product.Item) {
      throw new Error(`Product not found: ${item.productId}`);
    }
    
    const price = item.discountedPrice || product.Item.basePrice;
    const itemTotal = price * item.quantity;
    
    verifiedItems.push({
      productId: item.productId,
      name: product.Item.title,
      quantity: item.quantity,
      price: price,
      total: itemTotal,
      image: product.Item.mainImage
    });
    
    subtotal += itemTotal;
  }
  
  // Calculate totals (simplified - adjust as needed)
  const tax = subtotal * 0.1; // Example 10% tax
  const shippingFee = subtotal > 50 ? 0 : 5.99; // Free shipping over $50
  const discount = 0; // Could apply coupons here
  const total = subtotal + tax + shippingFee - discount;
  
  return {
    items: verifiedItems,
    totalAmount: {
      subtotal,
      tax,
      shippingFee,
      discount,
      total
    }
  };
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