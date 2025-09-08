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

const getUser = expressAsyncHandler(async(req, res)=>{
    const result = await userModel.find().sort({createdDate: "desc"})
    console.log(result);
    return res.status(200).json({
        message: "Get All Users",
        data: result
    })
})

module.exports = {addUser, getUser}
