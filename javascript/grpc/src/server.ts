import { Server, ServerCredentials } from "@grpc/grpc-js";
import type {
  DemoServiceServer,
  UserResponse,
} from "./generated/demo.js";
import { DemoServiceService } from "./generated/demo.js";

const users: UserResponse[] = [
  { id: 1, name: "Ada Lovelace", email: "ada@example.com" },
  { id: 2, name: "Alan Turing", email: "alan@example.com" },
  { id: 3, name: "Grace Hopper", email: "grace@example.com" },
];

const demoService: DemoServiceServer = {
  getUser: (call, callback) => {
    const user = users.find((u) => u.id === call.request.id);
    if (!user) {
      callback({ code: 5, message: `User ${call.request.id} not found` });
      return;
    }
    callback(null, user);
  },

  listUsers: (call) => {
    const pageSize = call.request.pageSize || users.length;
    const page = call.request.page || 0;
    const start = page * pageSize;
    for (const user of users.slice(start, start + pageSize)) {
      call.write(user);
    }
    call.end();
  },

  uploadScores: (call, callback) => {
    let total = 0;
    let sum = 0;
    call.on("data", (score) => {
      total += 1;
      sum += score.value;
    });
    call.on("end", () => {
      callback(null, {
        totalScores: total,
        average: total > 0 ? sum / total : 0,
      });
    });
  },

  chat: (call) => {
    call.on("data", (message) => {
      call.write({
        sender: "server",
        message: `echo: ${message.message}`,
        timestamp: Date.now(),
      });
    });
    call.on("end", () => call.end());
  },
};

const server = new Server();
server.addService(DemoServiceService, demoService);

const address = "0.0.0.0:50051";
server.bindAsync(address, ServerCredentials.createInsecure(), () => {
  console.log(`Server is running on ${address}`);
});
