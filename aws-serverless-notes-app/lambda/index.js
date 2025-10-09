const AWS = require("aws-sdk");
const uuid = require("uuid");

const ddb = new AWS.DynamoDB.DocumentClient({ region: process.env.REGION });
const TABLE = process.env.DDB_TABLE;

exports.handler = async (event) => {
  console.log("Event:", JSON.stringify(event));

  const method = event.requestContext?.http?.method || (event.httpMethod || "GET");
  const path = event.requestContext?.http?.path || event.path || "/";

  // parse body if present
  let body = {};
  try {
    if (event.body) body = JSON.parse(event.body);
  } catch (e) {
    console.warn("Invalid JSON body");
  }

  const headers = { "Content-Type": "application/json" };

  try {
    // Route by HTTP method and path
    if (method === "POST") {
      // create note
      const id = uuid.v4();
      const item = {
        id,
        title: body.title || "",
        content: body.content || "",
        createdAt: new Date().toISOString()
      };
      await ddb.put({ TableName: TABLE, Item: item }).promise();
      return { statusCode: 201, headers, body: JSON.stringify(item) };
    }

    if (method === "GET") {
      // if path contains id -> get single, else scan all
      const pathParts = path.split("/").filter(Boolean);
      if (pathParts.length >= 1 && pathParts[pathParts.length - 1]) {
        const id = pathParts[pathParts.length - 1];
        const res = await ddb.get({ TableName: TABLE, Key: { id } }).promise();
        if (!res.Item) return { statusCode: 404, headers, body: JSON.stringify({ message: "Not found" }) };
        return { statusCode: 200, headers, body: JSON.stringify(res.Item) };
      } else {
        const res = await ddb.scan({ TableName: TABLE }).promise();
        return { statusCode: 200, headers, body: JSON.stringify(res.Items || []) };
      }
    }

    if (method === "PUT") {
      // update by id in path
      const pathParts = path.split("/").filter(Boolean);
      const id = pathParts[pathParts.length - 1];
      const updates = {};
      if (body.title !== undefined) updates.title = body.title;
      if (body.content !== undefined) updates.content = body.content;
      if (!id) return { statusCode: 400, headers, body: JSON.stringify({ message: "Missing id in path" }) };

      const updateExpr = [];
      const exprAttr = {};
      let idx = 0;
      for (const k of Object.keys(updates)) {
        idx++;
        const key = `#k${idx}`;
        const val = `:v${idx}`;
        updateExpr.push(`${key} = ${val}`);
        exprAttr[key] = k;
        exprAttr[val] = updates[k];
      }

      if (updateExpr.length === 0) return { statusCode: 400, headers, body: JSON.stringify({ message: "No fields to update" }) };

      await ddb.update({
        TableName: TABLE,
        Key: { id },
        UpdateExpression: "SET " + updateExpr.join(", "),
        ExpressionAttributeNames: Object.fromEntries(Object.entries(exprAttr).filter(([k]) => k.startsWith("#"))),
        ExpressionAttributeValues: Object.fromEntries(Object.entries(exprAttr).filter(([k]) => k.startsWith(":")))
      }).promise();

      const res = await ddb.get({ TableName: TABLE, Key: { id } }).promise();
      return { statusCode: 200, headers, body: JSON.stringify(res.Item) };
    }

    if (method === "DELETE") {
      const pathParts = path.split("/").filter(Boolean);
      const id = pathParts[pathParts.length - 1];
      if (!id) return { statusCode: 400, headers, body: JSON.stringify({ message: "Missing id in path" }) };
      await ddb.delete({ TableName: TABLE, Key: { id } }).promise();
      return { statusCode: 204, headers, body: "" };
    }

    return { statusCode: 405, headers, body: JSON.stringify({ message: "Method not allowed" }) };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, headers, body: JSON.stringify({ message: "Internal error", error: err.message }) };
  }
};
