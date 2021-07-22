const express = require("express");
const server = express();
const usersRouter = require("./users/router");

server.use(express.json());

server.use("/", (req, res, next) => {
  res.json({
    message: "server up",
  });
});

// server.use("/api/users", usersRouter);

module.exports = server;
