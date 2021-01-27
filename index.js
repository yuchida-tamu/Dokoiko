require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.on("open", () => {
  console.log("DB connected!!!");
});

app.use(cors());
/*
 * parses request body (json)
 */
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!!");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("server is running...");
});
