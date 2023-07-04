import * as path from "path";
import * as grpc from "@grpc/grpc-js";
import { DemoHandlers } from "../../proto/demoPackage/Demo";
import { ZodError, z } from "zod";

const regularRequestSchema = z.object({
  name: z.string().min(1).max(10),
});

const RegularMethod: DemoHandlers["RegularMethod"] = (call, callback) => {
  try {
    const { name } = regularRequestSchema.parse(call.request);
    const response = `Hello, ${name}!`;
    callback(null, { message: response });
  } catch (err) {
    if (err instanceof ZodError) {
      callback(
        {
          code: grpc.status.INVALID_ARGUMENT,
          message: err.message,
        },
        null
      );
    }
  }
};

const StreamFromClient: DemoHandlers["StreamFromClient"] = (call, callback) => {
  const buffer: { name: string }[] = [];
  call.on("data", (data: { name: string }) => {
    buffer.push(data);
  });

  call.on("end", () => {
    callback(null, { message: JSON.stringify(buffer) });
  });

  call.on("error", (error) => {
    callback(error, null);
  });
};

const StreamFromServer: DemoHandlers["StreamFromServer"] = (call) => {
  const data = [
    { message: "Hello" },
    { message: "from" },
    { message: "server" },
  ];

  data.forEach((d) => call.write(d));

  call.end();
};

const BidirectionalStream: DemoHandlers["BidirectionalStream"] = (call) => {
  call.on("data", (data) => {
    const response = `Received data from client: ${data.message}`;
    console.log(response);

    const responseData = { message: `Received: ${data.message}` };
    call.write(responseData);
  });

  call.on("end", () => {
    call.end();
  });

  call.on("error", (error) => {
    console.error(error);
    call.end();
  });
};

const handlers: DemoHandlers = {
  RegularMethod,
  StreamFromClient,
  StreamFromServer,
  BidirectionalStream,
};

export default handlers;
