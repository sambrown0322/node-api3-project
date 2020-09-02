const express = require("express");
const userDb = require("./userDb");
const postDb = require("../posts/postDb");

const router = express.Router();

router.post("/", validateUser, (req, res) => {
  // do your magic!
  userDb
    .insert(req.body)
    .then((rez) => {
      res.status(200).json({ message: "I werk" });
    })
    .catch();
});

router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  // do your magic!
  postDb
    .insert(req.body)
    .then((rez) => {
      res.status(200).json({ message: "I werk" });
    })
    .catch((err) => {
      res.status(400).json({ err: err });
    });
});

router.get("/", (req, res) => {
  // do your magic!
  userDb.get().then((rez) => {
    res.status(200).json({ data: rez });
  });
});

router.get("/:id", validateUserId, (req, res) => {
  // do your magic!
  res.status(200).json({ data: req.user });
});

router.get("/:id/posts", validateUserId, (req, res) => {
  // do your magic!
  res.status(200).json({ message: "Werk" });
});

router.delete("/:id", validateUserId, (req, res) => {
  // do your magic!
  res.status(200).json({ message: "Werk" });
});

router.put("/:id", validateUserId, (req, res) => {
  // do your magic!
  res.status(200).json({ message: "Werk" });
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  const id = Number(req.params.id);
  userDb
    .getById(id)
    .then((rez) => {
      if (rez) {
        req.user = rez;
        req.body.user_id = rez.id;
        next();
      } else {
        res.status(400).json({ message: "invalid user id" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ message: "invalid user id" });
    });
}

function validateUser(req, res, next) {
  // do your magic!
  if (req.body.name) {
    next();
  } else if (req.body.name === "") {
    res.status(400).json({ message: "missing required name field" });
  } else {
    res.status(400).json({ message: "missing user data" });
  }
}

function validatePost(req, res, next) {
  // do your magic!
  if (req.body.text) {
    next();
  } else if (req.body.text === "") {
    res.status(400).json({ message: "missing required text field" });
  } else {
    res.status(400).json({ message: "missing user data" });
  }
}

module.exports = router;
