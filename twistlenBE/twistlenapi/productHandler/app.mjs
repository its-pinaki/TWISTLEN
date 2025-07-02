import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "ProductDetails";
const OFFER_TABLE = "OfferDetails";
const BUCKET_NAME = "twistlen-storage-bucket";

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
};

export const lambdaHandler = async (event) => {
  console.log("Event received:", event);

  try {
    const method = event.httpMethod; // Detect HTTP method
    const body = event.body ? JSON.parse(event.body) : {};
    const resource = event?.resource; // Detect resource path

    switch (method) {
      case "OPTIONS":
        // ✅ Handle preflight CORS requests
        return { statusCode: 200, headers, body: "" };

      case "GET":
        switch (resource) {
          case "products/getproductLists":
            const limit = parseInt(queryParams.limit) || 10;
            const lastEvaluatedKey = queryParams.lastEvaluatedKey
              ? JSON.parse(decodeURIComponent(queryParams.lastEvaluatedKey))
              : null;
            return await getProducts(limit, lastEvaluatedKey);

          case "products/getProduct":
            if (!queryParams.id) {
              return errorResponse(400, "Product ID is required");
            }
            return await getProductById(queryParams.id);

          case "offers/getOfferLists":
            const offerLimit = parseInt(queryParams.limit) || 10;
            const offerLastEvaluatedKey = queryParams.lastEvaluatedKey
              ? JSON.parse(decodeURIComponent(queryParams.lastEvaluatedKey))
              : null;
            return await getOffers(offerLimit, offerLastEvaluatedKey);

          case "offers/getOffer":
            if (!queryParams.id) {
              return errorResponse(400, "Offer ID is required");
            }
            return await getOfferById(queryParams.id);

          default:
            return errorResponse(404, "Resource not found");
        }

      case "POST": {
        // ✅ POST operation (insert new item)
        switch (resource) {
          case "products/addProduct":
            return await addProduct(event);
          case "offers/addOffer":
            return await addOffer(event);
          default:
            return errorResponse(404, "Resource not found");
        }
      }

      case "DELETE": {
        switch (resource) {
          case "products/deleteProduct":
            if (!queryParams.id) {
              return errorResponse(400, "Product ID is required");
            }
            return await deleteProduct(queryParams.id);
          case "offers/deleteOffer":
            if (!queryParams.id) {
              return errorResponse(400, "Offer ID is required");
            }
            return await deleteOffer(queryParams.id);
          default:
            return errorResponse(404, "Resource not found");
        }
      }

      default:
        return {
          statusCode: 405,
          body: JSON.stringify({ message: "Method Not Allowed" }),
        };
    }
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error", error }),
    };
  }
};

const successResponse = (statusCode, body) => ({
  statusCode,
  headers,
  body: JSON.stringify(body),
});

const errorResponse = (statusCode, message, error = null) => ({
  statusCode,
  headers,
  body: JSON.stringify({ message, error }),
});

export const addProduct = async (event) => {
  try {
    const data = JSON.parse(event.body);

    // Validate required fields
    if (!data.title || !data.slug || !data.category || !data.basePrice) {
      return errorResponse(
        400,
        "Missing required fields: title, slug, category, basePrice"
      );
    }

    const now = new Date().toISOString();
    let productId = data.id;
    let isUpdate = false;
    const imageUrls = {};
    const signedUrls = {};

    // Check if this is an update operation
    if (productId) {
      const existingProduct = await dynamoDB
        .get({
          TableName: TABLE_NAME,
          Key: { id: productId },
        })
        .promise();

      if (!existingProduct.Item) {
        return errorResponse(404, "Product not found for update");
      }

      isUpdate = true;
      // Keep existing URLs unless changed
      if (existingProduct.Item.mainImage)
        imageUrls.mainImage = existingProduct.Item.mainImage;
      if (existingProduct.Item.galleryImages)
        imageUrls.galleryImages = existingProduct.Item.galleryImages;
      if (existingProduct.Item.videoUrl)
        imageUrls.videoUrl = existingProduct.Item.videoUrl;
    } else {
      productId = uuidv4();
    }

    // Handle file uploads if provided
    if (data.mainImageFileName) {
      const fileKey = `products/${productId}/main-${Date.now()}-${
        data.mainImageFileName
      }`;
      signedUrls.mainImage = s3.getSignedUrl("putObject", {
        Bucket: BUCKET_NAME,
        Key: fileKey,
        ContentType: data.mainImageContentType || "image/jpeg",
        Expires: 300,
      });
      imageUrls.mainImage = fileKey;
    }

    if (data.galleryImageFileNames && data.galleryImageFileNames.length > 0) {
      imageUrls.galleryImages = [];
      signedUrls.galleryImages = [];

      data.galleryImageFileNames.forEach((fileName, index) => {
        const fileKey = `products/${productId}/gallery-${index}-${Date.now()}-${fileName}`;
        signedUrls.galleryImages.push(
          s3.getSignedUrl("putObject", {
            Bucket: BUCKET_NAME,
            Key: fileKey,
            ContentType: data.galleryImageContentTypes?.[index] || "image/jpeg",
            Expires: 300,
          })
        );
        imageUrls.galleryImages.push(fileKey);
      });
    }

    if (data.videoFileName) {
      const fileKey = `products/${productId}/video-${Date.now()}-${
        data.videoFileName
      }`;
      signedUrls.videoUrl = s3.getSignedUrl("putObject", {
        Bucket: BUCKET_NAME,
        Key: fileKey,
        ContentType: data.videoContentType || "video/mp4",
        Expires: 300,
      });
      imageUrls.videoUrl = fileKey;
    }

    // Prepare product item
    const productItem = {
      id: productId,
      title: data.title,
      slug: data.slug,
      description: data.description || "",
      category: data.category,
      subcategory: data.subcategory || "",
      status: data.status || "draft",
      tags: data.tags || [],
      basePrice: data.basePrice,
      discountedPrice: data.discountedPrice || data.basePrice,
      tax: data.tax || 0,
      videoUrl: imageUrls.videoUrl || null,
      mainImage: imageUrls.mainImage || null,
      galleryImages: imageUrls.galleryImages || [],
      galleryDescription: data.galleryDescription || "",
      sku: data.sku || `PROD-${productId.substring(0, 8).toUpperCase()}`,
      stockQuantity: data.stockQuantity || 0,
      stockStatus:
        data.stockStatus ||
        (data.stockQuantity > 0 ? "in_stock" : "out_of_stock"),
      weight: data.weight || 0,
      dimensions: data.dimensions || { length: 0, width: 0, height: 0 },
      shippingMethod: data.shippingMethod || "standard",
      originLocation: data.originLocation || "",
      metaTitle: data.metaTitle || data.title,
      metaDescription:
        data.metaDescription || data.description.substring(0, 160) || "",
      metaTags: data.metaTags || [],
      whyBuyItToday: data.whyBuyItToday || "",
      whyYouLoveIt: data.whyYouLoveIt || "",
      rating: data.rating || 0,
      ratingCount: data.ratingCount || 0,
      cartCount: data.cartCount || 0,
      deliveredCount: data.deliveredCount || 0,
      specifications: data.specifications || [], // Array of {key: "", value: ""}
      updatedAt: now,
      ...(!isUpdate && { createdAt: now }),
    };

    // Save to DynamoDB
    await dynamoDB
      .put({
        TableName: TABLE_NAME,
        Item: productItem,
      })
      .promise();

    return successResponse(isUpdate ? 200 : 201, {
      message: isUpdate
        ? "Product updated successfully"
        : "Product added successfully",
      productId: productId,
      ...(signedUrls.mainImage && { mainImageUploadUrl: signedUrls.mainImage }),
      ...(signedUrls.galleryImages && {
        galleryImageUploadUrls: signedUrls.galleryImages,
      }),
      ...(signedUrls.videoUrl && { videoUploadUrl: signedUrls.videoUrl }),
      productData: productItem,
      isUpdate: isUpdate,
    });
  } catch (error) {
    console.error("Error in add/update product:", error);
    return errorResponse(
      500,
      `Failed to ${event.body.id ? "update" : "add"} product`,
      error
    );
  }
};

// Get Product by ID
export const getProductById = async (productId) => {
  try {
    const params = {
      TableName: TABLE_NAME,
      Key: {
        id: productId,
      },
    };

    const result = await dynamoDB.get(params).promise();

    if (!result.Item) {
      return errorResponse(404, "Product not found");
    }

    // Generate read-only URLs for media files
    const productWithUrls = await generateReadUrls(result.Item);

    return successResponse(200, productWithUrls);
  } catch (error) {
    console.error("Error getting product:", error);
    return errorResponse(500, "Failed to get product", error);
  }
};

// Get Products with Pagination
export const getProducts = async (limit = 10, lastEvaluatedKey = null) => {
  try {
    const params = {
      TableName: TABLE_NAME,
      Limit: limit,
      ...(lastEvaluatedKey && { ExclusiveStartKey: lastEvaluatedKey }),
    };

    const result = await dynamoDB.scan(params).promise();

    // Generate read-only URLs for each product's media files
    const productsWithUrls = await Promise.all(
      result.Items.map(async (product) => {
        return await generateReadUrls(product);
      })
    );

    return successResponse(200, {
      products: productsWithUrls,
      lastEvaluatedKey: result.LastEvaluatedKey
        ? encodeURIComponent(JSON.stringify(result.LastEvaluatedKey))
        : null,
      count: result.Count,
    });
  } catch (error) {
    console.error("Error getting products:", error);
    return errorResponse(500, "Failed to get products", error);
  }
};

// Delete Product
export const deleteProduct = async (productId) => {
  try {
    // First get the product to identify files to delete from S3
    const getParams = {
      TableName: TABLE_NAME,
      Key: {
        id: productId,
      },
    };

    const product = await dynamoDB.get(getParams).promise();

    if (!product.Item) {
      return errorResponse(404, "Product not found");
    }

    // Delete files from S3
    await deleteProductFiles(product.Item);

    // Delete from DynamoDB
    const deleteParams = {
      TableName: TABLE_NAME,
      Key: {
        id: productId,
      },
      ReturnValues: "ALL_OLD",
    };

    const result = await dynamoDB.delete(deleteParams).promise();

    if (!result.Attributes) {
      return errorResponse(404, "Product not found or already deleted");
    }

    return successResponse(200, {
      message: "Product deleted successfully",
      deletedProduct: result.Attributes,
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    return errorResponse(500, "Failed to delete product", error);
  }
};

// Helper function to generate read-only URLs for media files
const generateReadUrls = async (product) => {
  const productWithUrls = { ...product };

  if (product.mainImage) {
    productWithUrls.mainImageUrl = s3.getSignedUrl("getObject", {
      Bucket: BUCKET_NAME,
      Key: product.mainImage,
      Expires: 3600, // 1 hour
    });
  }

  if (product.galleryImages && product.galleryImages.length > 0) {
    productWithUrls.galleryImageUrls = await Promise.all(
      product.galleryImages.map((key) =>
        s3.getSignedUrl("getObject", {
          Bucket: BUCKET_NAME,
          Key: key,
          Expires: 3600,
        })
      )
    );
  }

  if (product.videoUrl) {
    productWithUrls.videoUrl = s3.getSignedUrl("getObject", {
      Bucket: BUCKET_NAME,
      Key: product.videoUrl,
      Expires: 3600,
    });
  }

  return productWithUrls;
};

// Helper function to delete product files from S3
const deleteProductFiles = async (product) => {
  const deleteRequests = [];

  if (product.mainImage) {
    deleteRequests.push({
      Bucket: BUCKET_NAME,
      Key: product.mainImage,
    });
  }

  if (product.galleryImages) {
    product.galleryImages.forEach((key) => {
      deleteRequests.push({
        Bucket: BUCKET_NAME,
        Key: key,
      });
    });
  }

  if (product.videoUrl) {
    deleteRequests.push({
      Bucket: BUCKET_NAME,
      Key: product.videoUrl,
    });
  }

  if (deleteRequests.length > 0) {
    await Promise.all(
      deleteRequests.map((params) =>
        s3
          .deleteObject(params)
          .promise()
          .catch((error) =>
            console.error(`Error deleting file ${params.Key}:`, error)
          )
      )
    );
  }
};

// Offer Details-------------------------------------------------

// Add Offer
export const addOffer = async (event) => {
  try {
    const data = JSON.parse(event.body);

    // Validate required fields
    if (
      !data.title ||
      !data.endsIn ||
      !data.productContains ||
      data.productContains.length === 0
    ) {
      return errorResponse(
        400,
        "Missing required fields: title, endsIn, productContains"
      );
    }

    const now = new Date().toISOString();
    let offerId = data.id || uuidv4();
    let imageUrl = null;
    let signedUrl = null;

    // Handle offer image upload if provided
    if (data.imageFileName) {
      const fileKey = `offers/${offerId}-${Date.now()}-${data.imageFileName}`;

      signedUrl = s3.getSignedUrl("putObject", {
        Bucket: BUCKET_NAME,
        Key: fileKey,
        ContentType: data.imageContentType || "image/jpeg",
        Expires: 300, // 5 minutes
      });

      imageUrl = fileKey;
    }

    // Prepare offer item
    const offerItem = {
      id: offerId,
      title: data.title,
      description: data.description || "",
      tags: data.tags || [],
      endsIn: data.endsIn, // Expected format: ISO date string
      createdAt: now,
      updatedAt: now,
      imageUrl: imageUrl,
      productContains: data.productContains.map((item) => ({
        productId: item.productId,
        totalPrice: item.totalPrice,
        discountedPrice: item.discountedPrice || item.totalPrice,
        quantity: item.quantity || 1,
      })),
      status: data.status || "active",
      isFeatured: data.isFeatured || false,
    };

    // Save to DynamoDB
    await dynamoDB
      .put({
        TableName: OFFER_TABLE,
        Item: offerItem,
      })
      .promise();

    return successResponse(201, {
      message: "Offer added successfully",
      offerId: offerId,
      ...(signedUrl && { imageUploadUrl: signedUrl }),
      offerData: offerItem,
    });
  } catch (error) {
    console.error("Error in add offer:", error);
    return errorResponse(500, "Failed to add offer", error);
  }
};

// Get Offer by ID
export const getOfferById = async (offerId) => {
  try {
    const params = {
      TableName: OFFER_TABLE,
      Key: {
        id: offerId,
      },
    };

    const result = await dynamoDB.get(params).promise();

    if (!result.Item) {
      return errorResponse(404, "Offer not found");
    }

    // Generate read-only URL for offer image
    const offerWithUrls = await generateOfferImageUrl(result.Item);

    return successResponse(200, offerWithUrls);
  } catch (error) {
    console.error("Error getting offer:", error);
    return errorResponse(500, "Failed to get offer", error);
  }
};

// Get Offers with Pagination
export const getOffers = async (limit = 10, lastEvaluatedKey = null) => {
  try {
    const params = {
      TableName: OFFER_TABLE,
      Limit: limit,
      ...(lastEvaluatedKey && { ExclusiveStartKey: lastEvaluatedKey }),
    };

    const result = await dynamoDB.scan(params).promise();

    // Generate read-only URLs for each offer's image
    const offersWithUrls = await Promise.all(
      result.Items.map(async (offer) => {
        return await generateOfferImageUrl(offer);
      })
    );

    return successResponse(200, {
      offers: offersWithUrls,
      lastEvaluatedKey: result.LastEvaluatedKey
        ? encodeURIComponent(JSON.stringify(result.LastEvaluatedKey))
        : null,
      count: result.Count,
    });
  } catch (error) {
    console.error("Error getting offers:", error);
    return errorResponse(500, "Failed to get offers", error);
  }
};

// Delete Offer
export const deleteOffer = async (offerId) => {
  try {
    // First get the offer to identify image to delete from S3
    const getParams = {
      TableName: OFFER_TABLE,
      Key: {
        id: offerId,
      },
    };

    const offer = await dynamoDB.get(getParams).promise();

    if (!offer.Item) {
      return errorResponse(404, "Offer not found");
    }

    // Delete image from S3 if exists
    if (offer.Item.imageUrl) {
      await s3
        .deleteObject({
          Bucket: BUCKET_NAME,
          Key: offer.Item.imageUrl,
        })
        .promise();
    }

    // Delete from DynamoDB
    const deleteParams = {
      TableName: OFFER_TABLE,
      Key: {
        id: offerId,
      },
      ReturnValues: "ALL_OLD",
    };

    const result = await dynamoDB.delete(deleteParams).promise();

    if (!result.Attributes) {
      return errorResponse(404, "Offer not found or already deleted");
    }

    return successResponse(200, {
      message: "Offer deleted successfully",
      deletedOffer: result.Attributes,
    });
  } catch (error) {
    console.error("Error deleting offer:", error);
    return errorResponse(500, "Failed to delete offer", error);
  }
};

// Helper function to generate read-only URL for offer image
const generateOfferImageUrl = async (offer) => {
  const offerWithUrl = { ...offer };

  if (offer.imageUrl) {
    offerWithUrl.imageUrl = s3.getSignedUrl("getObject", {
      Bucket: BUCKET_NAME,
      Key: offer.imageUrl,
      Expires: 3600, // 1 hour
    });
  }

  return offerWithUrl;
};
