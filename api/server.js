const express = require("express");
const server = express();
const usersRouter = require("./users/router");

server.use(express.json());

server.use("/api/users", usersRouter);

server.use("/", (req, res, next) => {
  res.json({
    message: "server up",
  });
});

server.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server;
