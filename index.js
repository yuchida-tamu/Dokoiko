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

//MODELS=> REFACTOR LATER...
const EventList = new mongoose.Schema();
const PlaceList = new mongoose.Schema();
const Event = new mongoose.Schema();
const Place = new mongoose.Schema();

const UserSchema = new mongoose.Schema({
  username: { type: String },
  first_name: { type: String },
  last_name: { type: String },
  email: { type: String },
  password: { type: String },
  visiting_events: { type: [EventList] },
  visiting_places: { type: [PlaceList] },
  favorite_events: { type: [Event] },
  favorite_places: { type: [Place] },
});

mongoose.model("User", UserSchema);

app.use(cors());
/*
 * parses request body (json)
 */
app.use(bodyParser.json());

/*
 * user api service
 */
const user = require("./api/user");
app.use("/api/v1/user", user);

app.get("/", (req, res) => {
  res.send("Hello World!!");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("server is running...");
});
