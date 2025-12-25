const express = require("express");
const authRouter = express.Router();
const { loginUser, signupUser } = require("../controllers/authorization");
const {
  loginSchema,
  signupSchema,
} = require("../common/validation/authValida");
const { handleValidation } = require("../middleware/middleware");

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     tags: [Auth]
 *     description: User login
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *             type: object
 *             properties:
 *               email:
 *                  type: string
 *                  example: cheawon@gmail.com
 *               password:
 *                  type: string
 *                  example: Chay1537
 *     responses:
 *       200:
 *         description: Return a created book
 */
authRouter.post("/login", loginSchema, handleValidation, loginUser);

/**
 * @swagger
 * /api/v1/auth/signup:
 *  post:
 *      tags: [Auth]
 *      description: User Sign Up
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          username:
 *                              type: string
 *                              example: cheawon
 *                          email:
 *                              type: string
 *                              example: cheawon@gmail.com
 *                          age:
 *                              type: number
 *                              example: 21
 *                          gender:
 *                              type: string
 *                              example: female
 *                          password:
 *                              type: string
 *                              example: Chay1537
 *                          confirmedPassword:
 *                              type: string
 *                              example: Chay1537
 *      responses:
 *          201:
 *              description: Created User successfully
 */
authRouter.post("/signup", 
  // signupSchema, 
  // handleValidation, 
  signupUser);

module.exports = authRouter;
