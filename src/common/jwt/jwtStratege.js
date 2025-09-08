const { Strategy, ExtractJwt } = require("passport-jwt");
const userModel = require("../../models/userModel");

const opt = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_KEY,
};
const jwtStrategy = new Strategy(opt, async (jwt_payload, done) => {
  const user = await userModel.findById(jwt_payload.id);
  if (!user) {
    done(null, false);
  }
  done(null, user);
  // req.user
});

module.exports = jwtStrategy
