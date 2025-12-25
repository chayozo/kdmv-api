const { checkSchema } = require("express-validator");
const userModel = require("../../models/userModel");

const loginSchema = checkSchema({
  email: {
    isEmail: true,
    errorMessage: "Invalid email address",
  },
  password: {
    isLength: {
      options: { min: 8 },
    },
    errorMessage: "Password must be at least 5 letters",
  },
});
const signupSchema = checkSchema({
  username: {
    isLength: {
      options: {
        max: 15,
        min: 6,
      },
    },
  },
  email: {
    isEmail: true,
    // Check if email already registered
    custom: {
      options: async (value) => {
        const user = await userModel.findOne({ email: value });
        if (user) {
          throw new Error(`User with email: ${value} already existed`);
        }
      },
    },
  },
  // At least 8 letters, Capital, smallcase, Number
  password: {
    isLength: {
      options: {
        min: 8,
      },
    },
  },
  confirmedPassword: {
    custom: {
      options: async (value, { req }) => {
        if (value != req.body.password) {
          throw new Error("Password mismatched!");
        }
      },
    },
  },
});
module.exports = { loginSchema, signupSchema };
