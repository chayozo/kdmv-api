const express = require("express")
const productRouter = express.Router()
const { getProductByID, getProduct, addProduct, deleteProduct, updateProduct, getProductTest } = require("../controllers/productController")

productRouter.post('/', addProduct)
productRouter.get('/', getProduct)
// productRouter.get('/', getProductTest)
productRouter.get('/:id/', getProductByID)
productRouter.delete('/:id/', deleteProduct)
productRouter.put('/:id/', updateProduct)

module.exports = productRouter;   