import chokidar from "chokidar";

const watcher = chokidar.watch("./tmp");

watcher.on("all", (event, path) => {
  console.log(event, path);
});
