import coap from "coap";

// Create a CoAP request to a specific URL
const url = "coap://localhost/";

// Send a GET request
const sendGetRequest = () => {
  const req = coap.request(`${url}resource`);
  req.on("response", (res) => {
    console.log("GET Response:", res.payload.toString());
  });
  req.end();
};

// Send a POST request
const sendPostRequest = () => {
  const req = coap.request({
    method: "POST",
    host: "localhost",
    pathname: "/resource",
  });
  req.setOption("Content-Format", "text/plain");
  req.write("This is the payload for POST request");
  req.on("response", (res) => {
    console.log("POST Response:", res.payload.toString());
  });
  req.end();
};

// Send a PUT request
const sendPutRequest = () => {
  const req = coap.request({
    method: "PUT",
    host: "localhost",
    pathname: "/resource",
  });
  req.setOption("Content-Format", "text/plain");
  req.write("This is the payload for PUT request");
  req.on("response", (res) => {
    console.log("PUT Response:", res.payload.toString());
  });
  req.end();
};

// Send a DELETE request
const sendDeleteRequest = () => {
  const req = coap.request({
    method: "DELETE",
    host: "localhost",
    pathname: "/resource",
  });
  req.on("response", (res) => {
    console.log("DELETE Response:", res.payload.toString());
  });
  req.end();
};

// Send different requests
sendGetRequest();
sendPostRequest();
sendPutRequest();
sendDeleteRequest();
