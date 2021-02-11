const mongoose = require("mongoose");

module.exports = () => {
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.on("open", () => {
    console.log("DB connected!!!");
  });
};
