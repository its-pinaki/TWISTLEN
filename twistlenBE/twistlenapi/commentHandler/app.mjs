import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const COMMENTS_TABLE = process.env.COMMENTS_TABLE || "Comments";

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
};

export const lambda_handler = async (event) => {
  console.log("Event received:", event);

  try {
    if (event.httpMethod === "POST" && event.resource === "/comments") {
      return await createComment(event);
    } else if (event.httpMethod === "GET" && event.resource === "/comments") {
      return await getComments(event);
    } else if (
      event.httpMethod === "PUT" &&
      event.pathParameters &&
      event.pathParameters.commentId
    ) {
      return await updateComment(event);
    } else if (
      event.httpMethod === "DELETE" &&
      event.pathParameters &&
      event.pathParameters.commentId
    ) {
      return await deleteComment(event);
    } else {
      return errorResponse(404, "Resource not found");
    }
  } catch (error) {
    console.error("Error:", error);
    return errorResponse(500, "Internal Server Error", error.message);
  }
};

/**
 * Create a comment.
 * Expects a JSON body with at least:
 * - threadId: ID of the discussion thread.
 * - userId: ID of the user posting the comment.
 * - text: The comment text.
 * Optionally, include:
 * - parentId: If replying to another comment.
 */
const createComment = async (event) => {
  try {
    const data = JSON.parse(event.body);
    const { threadId, parentId, userId, text } = data;

    if (!threadId || !userId || !text) {
      return errorResponse(400, "Missing required fields: threadId, userId, or text");
    }

    const commentId = uuidv4();
    const createdAt = new Date().toISOString();

    const commentItem = {
      commentId,
      threadId,
      parentId: parentId || null,
      userId,
      text,
      createdAt,
    };

    await dynamoDB
      .put({
        TableName: COMMENTS_TABLE,
        Item: commentItem,
      })
      .promise();

    return successResponse(201, { message: "Comment created", comment: commentItem });
  } catch (error) {
    console.error("Error in createComment:", error);
    return errorResponse(500, "Internal Server Error", error.message);
  }
};

/**
 * Retrieve comments for a given thread and build a nested tree.
 * Expects a query parameter: threadId.
 */
const getComments = async (event) => {
  try {
    const { threadId } = event.queryStringParameters || {};
    if (!threadId) {
      return errorResponse(400, "Missing threadId query parameter");
    }

    // In production, consider using a GSI on threadId.
    const result = await dynamoDB
      .scan({
        TableName: COMMENTS_TABLE,
        FilterExpression: "threadId = :threadId",
        ExpressionAttributeValues: { ":threadId": threadId },
      })
      .promise();

    const comments = result.Items || [];
    const nestedComments = buildCommentTree(comments);

    return successResponse(200, { threadId, comments: nestedComments });
  } catch (error) {
    console.error("Error in getComments:", error);
    return errorResponse(500, "Internal Server Error", error.message);
  }
};

/**
 * Update an existing comment.
 * Expects a path parameter "commentId" and a JSON body containing the new "text".
 */
const updateComment = async (event) => {
  try {
    const { commentId } = event.pathParameters;
    const data = JSON.parse(event.body);
    const { text } = data;

    if (!text) {
      return errorResponse(400, "Missing required field: text");
    }

    const params = {
      TableName: COMMENTS_TABLE,
      Key: { commentId },
      UpdateExpression: "set text = :text",
      ExpressionAttributeValues: {
        ":text": text,
      },
      ReturnValues: "ALL_NEW",
    };

    const result = await dynamoDB.update(params).promise();
    return successResponse(200, { message: "Comment updated", comment: result.Attributes });
  } catch (error) {
    console.error("Error in updateComment:", error);
    return errorResponse(500, "Internal Server Error", error.message);
  }
};

/**
 * Delete a comment.
 * Expects a path parameter "commentId".
 */
const deleteComment = async (event) => {
  try {
    const { commentId } = event.pathParameters;
    if (!commentId) {
      return errorResponse(400, "Missing required parameter: commentId");
    }
    const params = {
      TableName: COMMENTS_TABLE,
      Key: { commentId },
    };
    await dynamoDB.delete(params).promise();
    return successResponse(200, { message: "Comment deleted" });
  } catch (error) {
    console.error("Error in deleteComment:", error);
    return errorResponse(500, "Internal Server Error", error.message);
  }
};

/**
 * Build a nested comment tree from a flat array of comments.
 */
const buildCommentTree = (comments) => {
  const commentMap = {};
  comments.forEach((comment) => {
    comment.children = [];
    commentMap[comment.commentId] = comment;
  });

  const nested = [];
  comments.forEach((comment) => {
    if (comment.parentId && commentMap[comment.parentId]) {
      commentMap[comment.parentId].children.push(comment);
    } else {
      nested.push(comment);
    }
  });

  return nested;
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
