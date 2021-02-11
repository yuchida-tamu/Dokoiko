require("dotenv").config();
const mongoose = require("mongoose");

module.exports = (isProd) => {
  const URI = isProd ? process.env.MONGODB_URI : process.env.MONGODB_URI_DEV;
  mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.on("open", () => {
    console.log("DB connected!!!");
  });
  // const notification = await notifyConnection(db);
  // console.log("CONNECTION: ", notification);
  // console.log("Database connected:", URI);
};

const notifyConnection = (db) => {
  return new Promise((resolve, reject) => {
    db.on("error", () => {
      reject("FAIL");
    });
    db.on("open", () => {
      resolve("SUCCESS");
      //console.log("DB connected!!!");
    });
  });
};
