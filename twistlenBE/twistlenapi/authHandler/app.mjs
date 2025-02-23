import AWS from "aws-sdk";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

// Initialize DynamoDB client and constants
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "Users";
const SALT_ROUNDS = 10;

// Secrets for signing tokens (store these in environment variables in production)
const JWT_SECRET = process.env.JWT_SECRET || "your_default_access_secret";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "your_default_refresh_secret";

// Token expiration times
const ACCESS_TOKEN_EXPIRES_IN = "15m"; // Access token valid for 15 minutes
const REFRESH_TOKEN_EXPIRES_IN = "7d"; // Refresh token valid for 7 days

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
};

export const lambda_handler = async (event) => {
  console.log("Event received:", event);
  console.log("Path received:", event.resource);

  try {
    const { resource, body } = event;
    let parsedBody = {};
    try {
      parsedBody = body ? JSON.parse(body) : {};
    } catch (error) {
      return errorResponse(400, "Invalid JSON format");
    }

    switch (resource) {
      case "/register":
        return await registerUser(parsedBody);
      case "/login":
        return await loginUser(parsedBody);
      case "/forgot-password":
        return await forgotPassword(parsedBody);
      case "/change-password":
        return await changePassword(parsedBody);
      case "/refresh-token":
        return await refreshToken(parsedBody);
      default:
        return errorResponse(404, "Resource not found");
    }
  } catch (error) {
    console.error("Error:", error);
    return errorResponse(500, "Internal Server Error", error);
  }
};

export const registerUser = async ({ username, email, password }) => {
  if (!username || !email || !password) {
    return errorResponse(400, "Missing required fields");
  }

  // Check if a user with the same email already exists
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return errorResponse(400, "User with this email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  const user = { id: uuidv4(), username, email, password: hashedPassword };

  const params = { TableName: TABLE_NAME, Item: user };
  await dynamoDB.put(params).promise();

  return successResponse(201, { message: "User registered successfully" });
};

export const loginUser = async ({ email, password }) => {
  if (!email || !password) {
    return errorResponse(400, "Missing email or password");
  }

  const user = await getUserByEmail(email);
  if (!user) {
    return errorResponse(400, "Invalid email or password");
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return errorResponse(400, "Invalid email or password");
  }

  // Create token payload
  const tokenPayload = {
    id: user.id,
    email: user.email,
    username: user.username,
  };

  // Generate both access and refresh tokens
  const accessToken = jwt.sign(tokenPayload, JWT_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
  });
  const refreshToken = jwt.sign(tokenPayload, JWT_REFRESH_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRES_IN,
  });

  return successResponse(200, {
    message: "Login successful",
    accessToken,
    refreshToken,
  });
};

export const forgotPassword = async ({ email }) => {
  if (!email) {
    return errorResponse(400, "Email is required");
  }

  const user = await getUserByEmail(email);
  if (!user) {
    // Do not reveal if the email is not registered
    return successResponse(200, {
      message: "If that email is registered, you will receive a reset link",
    });
  }

  const resetToken = uuidv4();
  const params = {
    TableName: TABLE_NAME,
    Key: { id: user.id },
    UpdateExpression: "set resetToken = :rt",
    ExpressionAttributeValues: { ":rt": resetToken },
  };

  await dynamoDB.update(params).promise();
  console.log(`Reset token for ${email}: ${resetToken}`);

  return successResponse(200, {
    message: "Password reset token generated. Check your email for further instructions.",
  });
};

export const changePassword = async (data) => {
  const { email, newPassword, oldPassword, token } = data;
  if (!email || !newPassword) {
    return errorResponse(400, "Email and new password are required");
  }

  const user = await getUserByEmail(email);
  if (!user) {
    return errorResponse(400, "User not found");
  }

  // Verify using token-based reset flow if token provided
  if (token) {
    if (!user.resetToken || user.resetToken !== token) {
      return errorResponse(400, "Invalid or expired token");
    }
  }
  // Otherwise, verify the old password
  else if (oldPassword) {
    const passwordMatch = await bcrypt.compare(oldPassword, user.password);
    if (!passwordMatch) {
      return errorResponse(400, "Old password is incorrect");
    }
  } else {
    return errorResponse(400, "Either old password or reset token must be provided");
  }

  const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);
  const params = {
    TableName: TABLE_NAME,
    Key: { id: user.id },
    UpdateExpression: "set password = :p remove resetToken",
    ExpressionAttributeValues: { ":p": hashedPassword },
  };

  await dynamoDB.update(params).promise();
  return successResponse(200, { message: "Password changed successfully" });
};

export const refreshToken = async ({ refreshToken }) => {
  if (!refreshToken) {
    return errorResponse(400, "Refresh token is required");
  }

  try {
    // Verify the refresh token using the refresh secret
    const payload = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
    const tokenPayload = {
      id: payload.id,
      email: payload.email,
      username: payload.username,
    };

    // Issue new tokens
    const newAccessToken = jwt.sign(tokenPayload, JWT_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    });
    const newRefreshToken = jwt.sign(tokenPayload, JWT_REFRESH_SECRET, {
      expiresIn: REFRESH_TOKEN_EXPIRES_IN,
    });

    return successResponse(200, {
      message: "Token refreshed successfully",
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    return errorResponse(401, "Invalid refresh token");
  }
};

const getUserByEmail = async (email) => {
  const params = {
    TableName: TABLE_NAME,
    FilterExpression: "email = :email",
    ExpressionAttributeValues: { ":email": email },
  };

  const result = await dynamoDB.scan(params).promise();
  return result.Items && result.Items.length > 0 ? result.Items[0] : null;
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
