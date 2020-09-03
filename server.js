const express = require("express");
const postRouter = require("./posts/postRouter");
const userRouter = require("./users/userRouter");

const server = express();

server.use(express.json());
server.use("/api/posts", postRouter);
server.use("/api/users", userRouter);

server.use(logger);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(
    `a ${req.method} request was made to ${
      req.url
    } at ${new Date().toISOString()}`
  );
  next();
}

function validateUserId(id) {
  return function (req, res, next) {
    if (req.headers.id === id) {
      next();
    } else {
      res.status(400).json({ message: "missing required name field" });
    }
  };
}

function validateUser(body) {
  return function (req, res, next) {
    if (!req.body) {
      res.status(400).json({ message: "missing user data" });
    } else if (!req.body.name) {
      res.status(400).json({ message: "missing required name field" });
    } else {
      res.status(200).json({ body });
    }
  };
}

function validatePost(body) {
  return function (req, res, next) {
    if (!req.body) {
      res.status(400).json({ message: "missing post data" });
    } else if (!req.body.text) {
      res.status(400).json({ message: "missing required text field" });
    }
  };
}

module.exports = server;
