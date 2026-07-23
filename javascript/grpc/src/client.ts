import { credentials } from "@grpc/grpc-js";
import {
  DemoServiceClient,
  UploadSummary,
  UserResponse,
} from "./generated/demo.js";

const client = new DemoServiceClient(
  "localhost:50051",
  credentials.createInsecure(),
);

function getUser(id: number) {
  return new Promise<UserResponse>((resolve, reject) => {
    client.getUser({ id }, (error, response) => {
      if (error) return reject(error);
      resolve(response);
    });
  });
}

function listUsers() {
  return new Promise<UserResponse[]>((resolve, reject) => {
    const call = client.listUsers({ page: 0, pageSize: 10 });
    const users: UserResponse[] = [];
    call.on("data", (user) => users.push(user));
    call.on("end", () => resolve(users));
    call.on("error", reject);
  });
}

function uploadScores() {
  return new Promise<UploadSummary>((resolve, reject) => {
    const call = client.uploadScores((error, response) => {
      if (error) return reject(error);
      resolve(response);
    });
    call.write({ student: "Ada", value: 95 });
    call.write({ student: "Alan", value: 88 });
    call.write({ student: "Grace", value: 100 });
    call.end();
  });
}

function chat() {
  return new Promise<void>((resolve, reject) => {
    const call = client.chat();
    call.on("data", (message) => console.log("[chat]", message));
    call.on("end", () => resolve());
    call.on("error", reject);

    call.write({ sender: "client", message: "hello", timestamp: Date.now() });
    call.write({
      sender: "client",
      message: "how are you?",
      timestamp: Date.now(),
    });
    call.end();
  });
}

async function main() {
  const user = await getUser(1);
  console.log("User:", user);
  const users = await listUsers();
  console.log("Users:", users);
  const summary = await uploadScores();
  console.log("Upload summary:", summary);
  await chat();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
