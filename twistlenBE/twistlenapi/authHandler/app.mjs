import AWS from "aws-sdk";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { MailtrapClient } from "mailtrap";

// Initialize DynamoDB client and constants
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "Users";
const SALT_ROUNDS = 10;
const BUCKET_NAME = "twistlen-storage-bucket";

const s3 = new AWS.S3({
  apiVersion: "2006-03-01",
  signatureVersion: "v4",
});

//MailTrap details
const TOKEN = "3ac48adf3bf6f9599779d96514e4c9e2";
const SENDER_EMAIL = "demomailtrap.co";
const client = new MailtrapClient({ token: TOKEN });

const sender = { name: "Mailtrap Test", email: SENDER_EMAIL };

// Secrets for signing tokens (store these in environment variables in production)
const JWT_SECRET = process.env.JWT_SECRET || "your_default_access_secret";
const JWT_REFRESH_SECRET =
  process.env.JWT_REFRESH_SECRET || "your_default_refresh_secret";

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
      case "/update-profile":
        return await updateProfile(event);
      case "/get-user-profile":
        return await getUserProfile(event);
      default:
        return errorResponse(404, "Resource not found");
    }
  } catch (error) {
    console.error("Error:", error);
    return errorResponse(500, "Internal Server Error", error);
  }
};

export const registerUser = async ({ username, email, password, usertype }) => {
  if (!username || !email || !password || !usertype) {
    return errorResponse(400, "Missing required fields");
  }

  // Check if a user with the same email already exists
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return errorResponse(400, "User with this email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  const user = {
    id: uuidv4(),
    username,
    email,
    password: hashedPassword,
    usertype,
  };

  const params = { TableName: TABLE_NAME, Item: user };
  await dynamoDB.put(params).promise();

  return successResponse(201, { message: "User registered successfully" });
};

export const loginUser = async ({ email, password, usertype }) => {
  if (!email || !password || !usertype) {
    return errorResponse(400, "Missing email or password or usertype");
  }

  const user = await getUserByEmail(email);
  if (!user) {
    return errorResponse(400, "Invalid email or password");
  }

  if (user.usertype !== usertype) {
    return errorResponse(
      400,
      "User type does not match. Please switch to the correct user type: Merchant, Partner, or Shopper."
    );
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
  console.log("email will send");
  client
    .send({
      from: sender,
      to: [{ email: email }],
      subject: "Hello from Mailtrap!",
      text: "Welcome to Mailtrap Sending!",
    })
    .then(console.log)
    .catch(console.error);
  console.log("email already sent");

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
    Key: { username: user.username },
    UpdateExpression: "set resetToken = :rt",
    ExpressionAttributeValues: { ":rt": resetToken },
  };

  await dynamoDB.update(params).promise();
  console.log(`Reset token for ${email}: ${resetToken}`);

  return successResponse(200, {
    message:
      "Password reset token generated. Check your email for further instructions.",
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
    return errorResponse(
      400,
      "Either old password or reset token must be provided"
    );
  }

  const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);
  const params = {
    TableName: TABLE_NAME,
    Key: { username: user.username },
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

export const getUserProfile = async (event) => {
  try {
    const { headers } = event;

    // Check if Authorization header is provided
    const authHeader = headers.Authorization || headers.authorization;
    if (!authHeader) {
      return errorResponse(401, "Access token required");
    }

    const token = authHeader.split(" ")[1];

    // Verify token and get user payload
    let payload;
    try {
      payload = jwt.verify(token, JWT_SECRET);
      console.log("payload", payload);
    } catch (error) {
      return errorResponse(401, "Invalid or expired access token");
    }

    // Fetch user details from DB
    const params = {
      TableName: "Users",
      Key: { username: payload.username },
    };

    const result = await dynamoDB.get(params).promise();

    if (!result.Item) {
      return errorResponse(404, "User not found");
    }

    return successResponse(200, {
      message: "User profile fetched successfully",
      user: result.Item,
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return errorResponse(500, "Internal Server Error");
  }
};

const updateProfile = async (event) => {
  try {
    const { headers, body } = event;
    let parsedBody = {};

    // Parse JSON body
    try {
      parsedBody = body ? JSON.parse(body) : {};
    } catch (error) {
      return errorResponse(400, "Invalid JSON format");
    }

    const token = headers.Authorization || headers.authorization;
    if (!token) {
      return errorResponse(401, "Access token is required");
    }

    // Verify Token
    let decodedToken;
    try {
      decodedToken = jwt.verify(token.replace("Bearer ", ""), JWT_SECRET);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return errorResponse(401, "Access token expired");
      }
      return errorResponse(401, "Invalid access token");
    }

    console.log("decodedToken", decodedToken);
    const { username } = decodedToken;
    const { firstName, lastName, phoneNumber, address, profilePicture } =
      parsedBody;

    const updateExpression = [];
    const expressionAttributeValues = {};

    if (firstName) {
      updateExpression.push("firstName = :firstName");
      expressionAttributeValues[":firstName"] = firstName;
    }
    if (lastName) {
      updateExpression.push("lastName = :lastName");
      expressionAttributeValues[":lastName"] = lastName;
    }
    if (phoneNumber) {
      updateExpression.push("phoneNumber = :phoneNumber");
      expressionAttributeValues[":phoneNumber"] = phoneNumber;
    }
    if (address) {
      updateExpression.push("address = :address");
      expressionAttributeValues[":address"] = address;
    }

    // Handle File Upload to S3
    let fileKey = null;
    let signedUrl = null;

    if (profilePicture) {
      // Generate a unique file key
      fileKey = `profile_pictures/${username}-${Date.now()}-${profilePicture}`;

      // Generate Signed URL for Upload
      signedUrl = s3.getSignedUrl("putObject", {
        Bucket: BUCKET_NAME,
        Key: fileKey,
        ContentType: "image/jpeg", // Change this if needed
        Expires: 300, // 5 minutes
      });

      updateExpression.push("profilePicture = :profilePicture");
      expressionAttributeValues[":profilePicture"] = fileKey; // Store file key in DB
    }

    if (updateExpression.length === 0) {
      return errorResponse(400, "No valid fields provided for update");
    }

    const params = {
      TableName: TABLE_NAME,
      Key: { username },
      UpdateExpression: `set ${updateExpression.join(", ")}`,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: "ALL_NEW",
    };

    const updatedUser = await dynamoDB.update(params).promise();

    return successResponse(200, {
      message: "Profile updated successfully",
      user: updatedUser.Attributes,
      uploadUrl: signedUrl, // Send signed URL to frontend for upload
      fileKey: fileKey, // Send file key for reference
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return errorResponse(500, "Internal Server Error");
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
