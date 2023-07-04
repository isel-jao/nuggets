import path from "path";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { ProtoGrpcType } from "../../proto/demo";
import { DemoClient } from "../../proto/demoPackage/Demo";
import { RegularRequest } from "../../proto/demoPackage/RegularRequest";
import { RegularResponse__Output } from "../../proto/demoPackage/RegularResponse";

const PORT = 5000;

const packageDefinition = protoLoader.loadSync(
  path.resolve(__dirname, "..", "..", "proto", "demo.proto")
);

const grpcObject = grpc.loadPackageDefinition(
  packageDefinition
) as unknown as ProtoGrpcType;

class GrpcClient {
  private client: DemoClient;
  constructor() {
    this.client = new grpcObject.demoPackage.Demo(
      `localhost:${PORT}`,
      grpc.credentials.createInsecure()
    );
  }

  public start() {
    const deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 5);
    let maxAttempts = 200;
    let attempts = 0;
    const interval = setInterval(() => {
      console.log("Connecting to Deme server...");
      if (attempts >= maxAttempts) {
        clearInterval(interval);
        console.error("Demo server not ready");
        return;
      }
      attempts++;

      this.client.waitForReady(deadline, (err) => {
        if (err) {
          console.error("Demo Server not ready");
          return;
        }
        console.log("Demo Server ready");
        clearInterval(interval);
      });
    }, 1000);
  }

  public regularMethod(
    data: RegularRequest
  ): Promise<RegularResponse__Output | undefined> {
    return new Promise((resolve, reject) => {
      this.client.RegularMethod(data, (err, response) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(response);
      });
    });
  }

  public streamFromClient(
    data: RegularRequest
  ): Promise<RegularResponse__Output | undefined> {
    return new Promise((resolve, reject) => {
      const call = this.client.StreamFromClient((err, response) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(response);
      });

      call.write(data);
      call.write(data);
      call.write(data);
      call.write(data);
      call.end();
    });
  }
}

const client = new GrpcClient();

async function main() {
  client.start();
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const data = { name: "John" };
  const response = await client.regularMethod(data);
  console.log(response);

  const streamFromClientResponse = await client.streamFromClient({
    name: "John",
  });

  console.log(streamFromClientResponse);
}

main().catch(console.error);
