const expressAsyncHandler = require("express-async-handler");
const userModel = require("../models/userModel");
const { signJWT } = require("../util/signJWT");
const bcrypt = require("bcrypt");

const loginUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email: email });
  // console.log(user)
  if (!user) {
    return res.json({ message: "User Not Found!!" });
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.json({ message: "Email and Password is incorrect!" });
  }
  const token = signJWT(user._id, user.email)
  return res.json({
    id: user._id, email: user.email, token
  })
});
const signupUser = expressAsyncHandler(async (req, res) => {
    const {username, email, age, gender, role, password} = req.body
    const passwordhashed = await bcrypt.hash(password, 10)
    const user = new userModel({
        username, email, age, gender, role, password: passwordhashed
    }) 
    const result = await user.save()
    return res.status(201).json({
        message: "Resigtered User Successful",
        data: result
    })
});
module.exports = { loginUser, signupUser };
