import { app as server } from "./app/app";

const serverPort = process.env.SERVER_PORT || 8080;

server.listen(serverPort, () => {
  console.log(`server running on port ${serverPort}`);
});
