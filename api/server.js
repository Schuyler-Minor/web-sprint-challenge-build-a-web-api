const express = require("express");
const server = express();

server.use(express.json());

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

// /api/actions
const actionsRouter = require("./actions/actions-router");

server.use("/api/actions", actionsRouter);

const projectsRouter = require("./projects/projects-router");
server.use("/api/projects", projectsRouter);

server.use("*", (req, res) => {
  res.status(404).json({
    message: "not found",
  });
});

module.exports = server;
