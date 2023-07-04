import path from "path";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { ProtoGrpcType } from "../../proto/demo";
import handlers from "./services";

const PORT = 5000;

const packageDefinition = protoLoader.loadSync(
  path.resolve(__dirname, "..", "..", "proto", "demo.proto")
);

const grpcObject = grpc.loadPackageDefinition(
  packageDefinition
) as unknown as ProtoGrpcType;

const demoPackage = grpcObject.demoPackage;

class GrpcServer {
  private server: grpc.Server;
  constructor() {
    this.server = new grpc.Server();
  }
  start() {
    this.server.addService(demoPackage.Demo.service, handlers);

    this.server.bindAsync(
      `0.0.0.0:${PORT}`,
      grpc.ServerCredentials.createInsecure(),
      (err, PORT) => {
        if (err) {
          console.log(err);
        }
        console.log(`grpc server running on port ${PORT}`);
        this.server.start();
      }
    );
  }
}

const server = new GrpcServer();

server.start();
