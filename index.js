const express = require("express");
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
require("dotenv").config();
const app = express();
const port = process.env.DB_PORT;
dbconnect().catch((err) => {
  console.log("Connection Error:", err);
});
app.use(cors()); // allow frontend requests
app.use(bodyParser.json());
passport.use(jwtStrategy);
app.use(logger);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use(
  "/api/v1/product",
  passport.authenticate("jwt", { session: false }),
  productRouter
);
app.use(errorHandler);
app.listen(port, () => {
  console.log(`✅ Server is running on http://localhost:${port}`);
});
