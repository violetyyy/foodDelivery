import express from "express";

const server = express();
server.use(express.json());

const port = 3000;

server.get("/", (_request, response) => {
  response.send("Hi");
});

server.listen(port, () => {
  console.log(`server ${port} port deer aslaa`);
});
