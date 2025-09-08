const express = require("express");
const authRouter = express.Router();
const { loginUser, signupUser } = require("../controllers/authorization");
const { loginSchema, signupSchema } = require("../common/validation/authValida");
const { handleValidation } = require("../middleware/middleware");

authRouter.post("/login", loginSchema, handleValidation, loginUser);
authRouter.post("/signup", signupSchema, handleValidation, signupUser);

module.exports = authRouter;
