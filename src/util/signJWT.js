const jwt = require("jsonwebtoken");

const signJWT = (id, email) => {
  const token = jwt.sign(
    {
      id: id,
      email: email,
    },
    process.env.JWT_KEY,
    { expiresIn: "2h" }
  );
  return token;
};
module.exports = { signJWT };
