const express = require("express");
const postDb = require("./postDb");

const router = express.Router();

router.get("/", (req, res) => {
  // do your magic!
  res.status(200).json({ message: "Werk" });
});

router.get("/:id", (req, res) => {
  // do your magic!
  res.status(200).json({ message: "Werk" });
});

router.delete("/:id", (req, res) => {
  // do your magic!
  res.status(200).json({ message: "Werk" });
});

router.put("/:id", (req, res) => {
  // do your magic!
  res.status(200).json({ message: "Werk" });
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
}

module.exports = router;
