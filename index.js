const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.DB_PORT;
const cors = require("cors");
const dbconnect = require("./src/db/db");
const bodyParser = require("body-parser");
const {
  logger,
  errorHandler,
  verifyToken,
} = require("./src/middleware/middleware");
const productRouter = require("./src/routes/productRoute");
const userRouter = require("./src/routes/userRoute");
const authRouter = require("./src/routes/authRoute");
const passport = require("passport");
const jwtStrategy = require("./src/common/jwt/jwtStratege");
const { setupSwagger } = require("./src/swaggser/swaager");
dbconnect().catch((err) => {
  console.log("Connection Error:", err);
});
setupSwagger(app); // Swagger UI for API
app.use(cors()); // allow frontend requests
app.use(bodyParser.json()); // Json Request
passport.use(jwtStrategy); // Declaer Passport for Veriffy Token
app.use(logger);
app.use("/api/v1/auth", authRouter);
app.use(
  "/api/v1/user",
  passport.authenticate("jwt", { session: false }), // Veriffy Token with Passport
  userRouter
);
app.use(
  "/api/v1/product",
  passport.authenticate("jwt", { session: false }), // Veriffy Token with Passport
  productRouter
);
``;
app.use(errorHandler);
app.listen(port, () => {
  console.log(`✅ Server is running on http://localhost:${port}/api-docs`);
  console.log(`✅ Server is running on http://localhost:${port}/api/v1`);
});
