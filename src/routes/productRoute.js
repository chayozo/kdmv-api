const express = require("express");
const productRouter = express.Router();
const {
  getProductByID,
  getProduct,
  addProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/productController");

/**
 * @swagger
 * /api/v1/product/:
 *   post:
 *     tags: [Products]
 *     description: Create a book
 *     security:
 *      - bearerAuth: []
 *     requestBody:
 *       required: ture
 *       content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                example: ""
 *              description:
 *                type: string
 *                example: Haha Bro, u got me
 *              price:
 *                type: number
 *                example: 18
 *              qty:
 *                type: number
 *                example: 50
 *              image:
 *                type: string
 *                example: ["https://example.com/images/garmin-venu-front.jpg", "https://example.com/images/garmin-venu-side.jpg"]
 *     responses:
 *      200:
 *        description: Add New Products
 *
 */
productRouter.post("/", addProduct);

/**
 * @swagger
 * /api/v1/product/:
 *  get:
 *      tags: [Products]
 *      description: Get All Products
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: Return All Products
 */
productRouter.get("/", getProduct);

/**
 * @swagger
 * /api/v1/product/{id}:
 *  get:
 *    tags: [Products]
 *    description: Get Product by ID
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Return Product By ID
 */
productRouter.get("/:id/", getProductByID);

/**
 * @swagger
 * /api/v1/product/{id}:
 *  delete:
 *    tags: [Products]
 *    description: Delete Products
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *         type: string
 *    responses:
 *      200:
 *        descrption: Returns Deleted Products
 */
productRouter.delete("/:id/", deleteProduct);

/**
 * @swagger
 * /api/v1/product/{id}:
 *  put:
 *    tags: [Products]
 *    description: Update Product
 *    security:
 *     - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                example: ""
 *              price:
 *                type: number
 *                example: 20
 *              qty:
 *                type: number
 *                example: 60
 *              image:
 *                type: string
 *                example: ["https://example.com/images/garmin-venu-front.jpg"]
 *    responses:
 *      200:
 *        description: Update Products
 */
productRouter.put("/:id/", updateProduct);

module.exports = productRouter;
