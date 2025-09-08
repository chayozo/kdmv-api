const { addUser, getUser } = require("../controllers/userController");

const express = require("express");
const userRouter = express.Router();
userRouter.post("/", addUser);
userRouter.get("/", getUser);

module.exports = userRouter;
