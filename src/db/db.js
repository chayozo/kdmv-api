const mongoose = require("mongoose");
require("dotenv").config();

const dbHost = process.env.DB_HOST;
const dbName = process.env.DB_NAME;

async function dbconnect() {
  mongoose.connection.on("connected", () => {
    console.log("Connected:", dbName, `✅✅`);
  });
  await mongoose.connect(`mongodb://${dbHost}${dbName}`);
}

module.exports = dbconnect;
