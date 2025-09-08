const productImageModel = require("../models/productImageModel");
const productModel = require("../models/productModel");
const asyncHandler = require("express-async-handler");

const addProduct = asyncHandler(async (req, res) => {
  const { name, description, price, qty, image } = req.body;
  const product = new productModel({
    name: name,
    description: description,
    price: price,
    qty: qty,
  });
  console.log(product);
  // Create Product
  await product.save();
  if (!product) {
    return res.json({ message: "Have Something Wrong!!" });
  }

  //Create Image Document referencing this Product
  const imageDocs = await Promise.all(
    image.map(async (imgUrl) => {
      const images = new productImageModel({
        image: imgUrl,
        byProduct: product._id,
      });
      await images.save();
      return images._id;
    })
  );

  // Update Product with Image
  product.image = imageDocs;
  await product.save();

  return res.status(201).json({ success: true, product });
});

const getProduct = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.per_page) || 10;
  const skip = (page - 1) * perPage;

  // Get paginated products
  const products = await productModel
    .find()
    .sort({ createdDate: "desc" })
    .skip(skip)
    .limit(perPage)
    .populate({
      path: "image",
      options: { limit: 2 },
    });

  if (!products.length) {
    return res.status(404).json({
      message: "Record not found",
      status: false,
    });
  }

  const totalProducts = await productModel.countDocuments();
  const totalPages = Math.ceil(totalProducts / perPage);

  // Optional: return only image URL
  const result = products.map((product) => ({
    _id: product._id,
    name: product.name,
    description: product.description,
    price: product.price,
    qty: product.qty,
    createdDate: product.createdDate,
    // image: product.image.length ? product.image[0].image : null, //limit 1
    image: Array.isArray(product.image)
      ? product.image.map((img) =>img.image)
      : [],
  }));

  return res.status(200).json({
    status: true,
    message: "Product list",
    currentPage: page,
    perPage: perPage,
    totalProducts: totalProducts,
    totalPages: totalPages,
    data: result,
  });
});

const getProductByID = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const result = await productModel.findById(id);
  return res.json({
    message: "Get Product By ID",
    data: result,
  });
});

const deleteProduct = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const result = await productModel.findOneAndDelete({ _id: id });
  return res.json({
    message: `Deleted Product: ${result.name}`,
    data: result,
  });
});

const updateProduct = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { ...self } = req.body;
  const result = await productModel.updateOne({ ...self, id });
  return res.json({
    message: `Updated Product: ${result.name}`,
    data: result,
  });
});
module.exports = {
  addProduct,
  getProduct,
  getProductByID,
  deleteProduct,
  updateProduct,
};
