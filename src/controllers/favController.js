const asyncHandler = require("express-async-handler");
const favoriteModel = require("../models/favoriteModel");
const userModel = require("../models/userModel");

const addFav = asyncHandler(async (req, res) => {
  const { byUser, byProduct } = req.body;
  const favorite = new favoriteModel({
    byUser: byUser,
    byProduct: byProduct,
  });
  const existing = await favoriteModel.findOne({
    byUser: byUser,
    byProduct: byProduct,
  });
  if (existing) {
    return res.json({ message: "Already favorited" });
  }
  const result = await favorite.save();
  const user = await userModel.findById(byUser)
  user.favorite.push(result._id)
  await user.save()
  return res.json(result);
});

const getFav = asyncHandler(async (req, res) => {
  const { byUser } = req.body;
  console.log(byUser);
  const favorites = await favoriteModel
    .find({ byUser: byUser })
    .sort({ createdDate: "desc" })
    .populate({
      path: "byProduct",
      populate: {
        path: "image",
        model: "product_images",
        select: "image",
      },
    });
  return res.json(favorites);
});
const removeFav = asyncHandler(async (req, res) => {
  const { favID } = req.body;
  const favorite = await favoriteModel.findOne({ _id: favID });
  if (!favorite) {
    return res.json({ message: "Favorite not Found" });
  }
  const result = await favorite.deleteOne();
  return res.json({ message: "Removed Favorite", result });
});

module.exports = { addFav, getFav, removeFav };
