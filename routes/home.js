var express = require("express");
var Joi = require("joi");

const router = express.Router();
router.use(express.json());

router.get("/", (req, res) => {
  res.send("Welcome to the video rental routerlication");
});

module.exports = router;
