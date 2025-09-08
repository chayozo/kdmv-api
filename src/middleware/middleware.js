const jwt = require("jsonwebtoken");
require("dotenv").config();
const { validationResult } = require("express-validator");

const handleValidation = (req, res, next) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    next();
  } else {
    return res.status(401).json({ error: result.array() });
  }
};

const logger = (req, res, next) => {
  console.log(`${req.method}${req.url}`);
  next();
};
const errorHandler = (err, req, res, next) => {
  console.log("Server Down", err);
  return res.status(500).json({ message: err.message });
};

const verifyToken = (req, res, next) => {
  let token = req.header("Authorization");
  console.log(token);
  if (!token) {
    return res.json({ error: "Access Denied!" });
  }
  token = token.replace("Bearer ", "");
  const decoded = jwt.verify(token, process.env.JWT_KEY);
  req.user = decoded;
  next();
};

module.exports = { logger, errorHandler, verifyToken, handleValidation };
