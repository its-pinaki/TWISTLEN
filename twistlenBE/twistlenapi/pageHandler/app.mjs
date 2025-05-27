import AWS from "aws-sdk";

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "TwistlenItems";

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

    switch (method) {
      case "OPTIONS":
        // ✅ Handle preflight CORS requests
        return { statusCode: 200, headers, body: "" };

      case "GET": {
        // ✅ GET operation (fetch item by id or all items)
        const id = event.queryStringParameters?.id;

        if (id) {
          // Fetch specific item by id
          const params = { TableName: TABLE_NAME, Key: { id } };
          const result = await dynamoDB.get(params).promise();

          return {
            statusCode: result.Item ? 200 : 404,
            headers,
            body: JSON.stringify(result.Item || { message: "Item not found" }),
          };
        } else {
          // Fetch all items
          const params = { TableName: TABLE_NAME };
          const result = await dynamoDB.scan(params).promise();

          return {
            statusCode: 200,
            headers,
            body: JSON.stringify(result.Items),
          };
        }
      }

      case "POST": {
        // ✅ POST operation (insert new item)
        if (!body.id) {
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({ message: "Missing 'id' in body" }),
          };
        }

        const params = { TableName: TABLE_NAME, Item: body };
        await dynamoDB.put(params).promise();

        return {
          statusCode: 201,
          headers,
          body: JSON.stringify({
            message: "Item inserted",
            item: body,
          }),
        };
      }

      case "PUT": {
        // ✅ PUT operation (update existing item)
        if (!body.id) {
          return {
            statusCode: 400,
            body: JSON.stringify({ message: "Missing 'id' in body" }),
          };
        }

        const updateParams = {
          TableName: TABLE_NAME,
          Key: { id: body.id },
          UpdateExpression: "set #n = :name, description = :desc",
          ExpressionAttributeNames: { "#n": "name" },
          ExpressionAttributeValues: {
            ":name": body.name,
            ":desc": body.description,
          },
          ReturnValues: "UPDATED_NEW",
        };

        const result = await dynamoDB.update(updateParams).promise();

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            message: "Item updated",
            updated: result.Attributes,
          }),
        };
      }

      case "DELETE": {
        // ✅ DELETE operation (delete item by id)
        const id = event.queryStringParameters?.id;
        if (!id) {
          return {
            statusCode: 400,
            body: JSON.stringify({ message: "Missing 'id'" }),
          };
        }

        const deleteParams = { TableName: TABLE_NAME, Key: { id } };
        await dynamoDB.delete(deleteParams).promise();

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ message: "Item deleted" }),
        };
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
