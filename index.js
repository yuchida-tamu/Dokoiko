const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

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
