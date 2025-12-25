const expressAsyncHandler = require("express-async-handler");
const userModel = require("../models/userModel");
const { signJWT } = require("../util/signJWT");
const bcrypt = require("bcrypt");

const loginUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email: email });
  // console.log(user)
  if (!user) {
    return res.json({ message: "User Not Found!!", status: false });
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.json({
      message: "Email and Password is incorrect!",
      status: false,
    });
  }
  const token = signJWT(user._id, user.email);
  if (user) {
    return res.json({
      data: {
        id: user._id,
        email: user.email,
        token,
      },    
      message: "Login User Successfully",
      status: true,
    });
  }
  return res.json({
    message: "Fail to Login User ",
    status: false,
  });
});
const signupUser = expressAsyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  const passwordhashed = await bcrypt.hash(password, 10);
  const user = new userModel({
    username,
    email,
    password: passwordhashed,
  });
  const result = await user.save();
  if (result) {
    return res.status(201).json({
      message: "Resigtered User Successfully",
      data: result,
      status: true,
    });
  }
  return res.status(201).json({
    message: "You can't Register user...! ",
    status: false,
  });
});
module.exports = { loginUser, signupUser };
