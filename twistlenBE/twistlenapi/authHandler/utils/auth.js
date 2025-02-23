// CREATE USER
export const createUser = async ({ username, email }) => {
  if (!username || !email) return response(400, "Missing username or email");

  const params = {
    TableName: "Users",
    Item: { username, email },
  };

  await dynamoDB.put(params).promise();
  return response(201, "User created successfully");
};
