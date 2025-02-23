import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";

const dynamoDB = new AWS.DynamoDB.DocumentClient();

// DynamoDB table names
const LINKS_TABLE = "Links";        // Stores link details
const VISITS_TABLE = "LinkVisits";  // (Optional) Stores individual visit events

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
};

// The Lambda function acts as a router based on the request path and method.
export const lambda_handler = async (event) => {
  console.log("Event received:", event);

  try {
    // If the request is to create a link
    if (event.resource === "/create-link" && event.httpMethod === "POST") {
      return await createLink(event);
    }
    // Otherwise assume it’s a GET for redirection: path = "/{shortCode}"
    else if (event.httpMethod === "GET" && event.pathParameters && event.pathParameters.shortCode) {
      return await redirectLink(event.pathParameters.shortCode, event);
    }
    else {
      return errorResponse(404, "Resource not found");
    }
  } catch (error) {
    console.error("Error:", error);
    return errorResponse(500, "Internal Server Error", error.message);
  }
};

/**
 * Create a shareable link
 * Expects a JSON body with at least { originalURL: "https://example.com", userId: "optional_user_id" }
 */
const createLink = async (event) => {
  try {
    const { body } = event;
    const data = JSON.parse(body);
    const { originalURL, userId } = data;
    if (!originalURL) {
      return errorResponse(400, "Missing originalURL");
    }
    
    // Generate a unique short code (e.g., 6 characters)
    const shortCode = generateShortCode();
    const createdAt = new Date().toISOString();
    
    const linkItem = {
      shortCode,              // Primary key in the LINKS_TABLE
      originalURL,            // The original URL to redirect to
      createdAt,              // Timestamp for when the link was created
      visitCount: 0,          // Starts at 0; will be incremented on each visit
      createdBy: userId || null,  // (Optional) ID of the user who created the link
    };

    // Save the new link to DynamoDB
    await dynamoDB.put({
      TableName: LINKS_TABLE,
      Item: linkItem,
    }).promise();
    
    return successResponse(201, { message: "Link created", shortCode, originalURL });
    
  } catch (error) {
    console.error("Error in createLink:", error);
    return errorResponse(500, "Internal Server Error", error.message);
  }
};

/**
 * Handle link redirection and track visits.
 * Looks up the link by its shortCode, increments the visit counter,
 * optionally logs the visit details, and returns a redirect response.
 */
const redirectLink = async (shortCode, event) => {
    try {
      // Retrieve the link details from DynamoDB
      const result = await dynamoDB.get({
        TableName: LINKS_TABLE,
        Key: { shortCode },
      }).promise();
  
      if (!result.Item) {
        return errorResponse(404, "Link not found");
      }
  
      const linkItem = result.Item;
  
      // Parse cookies from the request headers
      const cookies = parseCookies(
        event.headers?.Cookie || event.headers?.cookie || ""
      );
      // Create a unique key for this link's visit on this device
      const cookieKey = `visited_${shortCode}`;
      const alreadyVisited = cookies && cookies[cookieKey] ? true : false;
  
      // If not visited on this device, increment the visit counter and log the visit
      if (!alreadyVisited) {
        await dynamoDB.update({
          TableName: LINKS_TABLE,
          Key: { shortCode },
          UpdateExpression: "SET visitCount = visitCount + :inc",
          ExpressionAttributeValues: {
            ":inc": 1,
          },
        }).promise();
  
        // Optionally log the detailed visit (e.g., IP, timestamp)
        const visitRecord = {
          id: uuidv4(),
          shortCode,
          timestamp: new Date().toISOString(),
          ip: event.requestContext?.identity?.sourceIp || "unknown",
        };
        await dynamoDB.put({
          TableName: VISITS_TABLE,
          Item: visitRecord,
        }).promise();
      }
  
      // Prepare response headers, including the redirect URL.
      // If the device hasn't visited before, set a cookie so that it won't be counted on subsequent clicks.
      const responseHeaders = { Location: linkItem.originalURL };
  
      if (!alreadyVisited) {
        // Set cookie to expire in 7 days (adjust Max-Age as needed)
        responseHeaders["Set-Cookie"] = `${cookieKey}=true; Path=/; Max-Age=${60 * 60 * 24 * 7}; HttpOnly`;
      }
  
      // Return a 302 redirect response to the original URL
      return {
        statusCode: 302,
        headers: responseHeaders,
        body: "",
      };
    } catch (error) {
      console.error("Error in redirectLink:", error);
      return errorResponse(500, "Internal Server Error", error.message);
    }
  };
  
  // Utility function to parse cookies from a string
  function parseCookies(cookieString) {
    const list = {};
    cookieString.split(";").forEach((cookie) => {
      const parts = cookie.split("=");
      const key = parts.shift().trim();
      const value = parts.join("=").trim();
      if (key) list[key] = decodeURIComponent(value);
    });
    return list;
  }
  

// Utility function to generate a random 6-character short code.
const generateShortCode = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

// Utility functions to format responses.
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
