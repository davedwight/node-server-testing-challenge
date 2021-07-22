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

module.exports = server;
