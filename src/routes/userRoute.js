const {
  addUserSchema,
  updateUserschema,
} = require("../common/validation/userValida");
const {
  addUser,
  getUser,
  updateUser,
  getUserByID,
  deleteUser,
} = require("../controllers/userController");

const express = require("express");
const { handleValidation } = require("../middleware/middleware");
const { addFav, getFav, removeFav } = require("../controllers/favController");
const userRouter = express.Router();

/**
 * @swagger
 * /api/v1/user/addFav/:
 *  post:
 *      tags: [Users]
 *      description: Add Favorite
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          required: ture
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          byUser:
 *                              type: string
 *                              example: ""
 *                          byProduct:
 *                              type: string
 *                              example: ""
 *      responses:
 *          200:
 *              description: Add Favorite Successfully
 */
userRouter.post("/addFav", addFav);
/**
 * @swagger
 * /api/v1/user/getFav/:
 *   post:
 *      tags: [Users]
 *      description: Get Favorite's User
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          required: ture
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          byUser:
 *                              type: string
 *                              example: ""
 *      responses:
 *          200:
 *              description: Get Favorite's User Successfully
 */
userRouter.post("/getFav", getFav);
/**
 * @swagger
 * /api/v1/user/removeFav/:
 *  delete:
 *      tags: [Users]
 *      description: Remove Favorite's User
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *        required: ture
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                favID:
 *                  type: string
 *                  example: ""
 *      responses:
 *          200:
 *              description: Removed Favorite's User Successfully
 */
userRouter.delete("/removeFav", removeFav);
/**
 * @swagger
 * /api/v1/user/:
 *  post:
 *      tags: [Users]
 *      description: Create User
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          required: ture
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          username:
 *                              type: string
 *                              example: ""
 *                          email:
 *                              type: string
 *                              example: ""
 *                          age:
 *                              type: number
 *                              example: 20
 *                          gender:
 *                              type: string
 *                              example: "Male"
 *                          password:
 *                              type: string
 *                              example: "15371537"
 *                          confirmedPassword:
 *                              type: string
 *                              example: "15371537"
 *
 *      responses:
 *          201:
 *              description: Created User Successfully
 */
userRouter.post("/", addUserSchema, handleValidation, addUser);
/**
 * @swagger
 * /api/v1/user/:
 *  get:
 *      tags: [Users]
 *      description: Get User
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: Get User Successfully
 */
userRouter.get("/", getUser);
/**
 * @swagger
 * /api/v1/user/{id}:
 *  get:
 *    tags: [Users]
 *    description: Get User By ID
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schame:
 *          type: string
 *    responses:
 *      200:
 *        description: Get User By Id Successfully
 */
userRouter.get("/:id", getUserByID);
/**
 * @swagger
 * /api/v1/user/{id}:
 *  delete:
 *    tags: [Users]
 *    description: Delete User
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        required: ture
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Deleted User is Successfully!
 */
userRouter.delete("/:id", deleteUser);
/**
 * @swagger
 * /api/v1/user/{id}:
 *  put:
 *    tags: [Users]
 *    description: Update User
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        required: ture
 *        schema:
 *          type: string
 *    requestBody:
 *      required: ture
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              username:
 *                type: string
 *                example: ""
 *              age:
 *                type: number
 *                example: "50"
 *              gender:
 *                type: string
 *                example: "Male"
 *    responses:
 *      200:
 *        description: Updated User Successfully!
 */
userRouter.put("/:id", updateUserschema, handleValidation, updateUser);

module.exports = userRouter;
