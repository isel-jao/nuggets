import coap from "coap";

// Create a CoAP server
const server = coap.createServer();

// Handle incoming requests
server.on("request", (req, res) => {
  // Log the received request details
  console.log("Received request:");
  console.log("Method:", req.method);
  console.log("URL:", req.url);
  console.log("Payload:", req.payload.toString());

  // Handle different CoAP methods
  switch (req.method) {
    case "GET":
      handleGetRequest(req, res);
      break;
    case "POST":
      handlePostRequest(req, res);
      break;
    case "PUT":
      handlePutRequest(req, res);
      break;
    case "DELETE":
      handleDeleteRequest(req, res);
      break;
    default:
      res.code = "4.05"; // CoAP Method Not Allowed response code
      res.end();
  }
});

// Handle GET requests
function handleGetRequest(req, res) {
  // Generate a response payload
  const responsePayload = `GET request received`;

  // Set the response payload and content format
  res.setOption("Content-Format", "text/plain");
  res.code = "2.05"; // CoAP success response code

  // Send the response
  res.end(responsePayload);
}

// Handle POST requests
function handlePostRequest(req, res) {
  // Extract the payload from the request
  const payload = req.payload.toString();

  // Generate a response payload
  const responsePayload = `POST request received with payload: ${payload}`;

  // Set the response payload and content format
  res.setOption("Content-Format", "text/plain");
  res.code = "2.05"; // CoAP success response code

  // Send the response
  res.end(responsePayload);
}

// Handle PUT requests
function handlePutRequest(req, res) {
  // Extract the payload from the request
  const payload = req.payload.toString();

  // Generate a response payload
  const responsePayload = `PUT request received with payload: ${payload}`;

  // Set the response payload and content format
  res.setOption("Content-Format", "text/plain");
  res.code = "2.05"; // CoAP success response code

  // Send the response
  res.end(responsePayload);
}

// Handle DELETE requests
function handleDeleteRequest(req, res) {
  // Generate a response payload
  const responsePayload = `DELETE request received`;

  // Set the response payload and content format
  res.setOption("Content-Format", "text/plain");
  res.code = "2.05"; // CoAP success response code

  // Send the response
  res.end(responsePayload);
}

// Start the server and listen on a specific port
const port = 5683; // CoAP default port
server.listen(port, () => {
  console.log(`CoAP server is listening on port ${port}`);
});
