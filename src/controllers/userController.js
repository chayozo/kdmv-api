const expressAsyncHandler = require("express-async-handler");
const userModel = require("../models/userModel");

const addUser = expressAsyncHandler(async (req, res) => {
  const { username, email, age, gender, role, password } = req.body;
  const user = new userModel({
    username: username,
    email: email,
    age: age,
    gender: gender,
    role: role,
    password: password,
  });
  const result = await user.save();
  console.log(result);
  return res.status(201).json({
    message: `Created User: ${username}`,
    data: result,
  });
});

const getUser = expressAsyncHandler(async (req, res) => {
  const result = await userModel
    .find()
    .sort({ createdDate: "desc" })
    .populate({
      path: "favorite",
      populate: {
        path: "byProduct",
        select: "name",
        populate: {
          path: "image",
          model: "product_images",
          select: "image",
        },
      },
    });
  console.log(result);
  return res.status(200).json({
    message: "Get All Users", 
    data: result,
  });
});
const getUserByID = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  const result = await userModel.findById(id);
  console.log(result);
  if (!result) {
    return res.status(200).json({ message: "User is Not Found" });
  }
  return res.status(200).json(result);
});

const deleteUser = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  const result = await userModel.findByIdAndDelete({ _id: id });
  return res.json({
    message: `Deleted Product Succesfully`,
    data: result,
  });
});

const updateUser = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  const { password, confirmedPassword, username, email, age, gender } =
    req.body;
  const result = await userModel.updateOne({
    username,
    email,
    age,
    gender,
    id,
  });
  const user = await userModel.findById(id);
  return res.json({ result, user });
});

module.exports = { addUser, getUser, updateUser, getUserByID, deleteUser };
