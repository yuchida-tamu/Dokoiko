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

const EventSchema = new mongoose.Schema({
  list_id: { type: String },
  place_id: { type: String },
  name: { type: String, required: true },
  description: { type: String },
  dateStart: { type: Date },
  dateEnd: { type: Date },
  photos: { type: [String] },
});
const PlaceSchema = new mongoose.Schema({
  place_id: { type: String },
  name: { type: String, required: true },
  events: { type: [String] },
  address: { type: String, required: true },
  location: {
    lat: { type: String, required: true },
    lng: { type: String, required: true },
  },
  photos: { type: [String] },
  types: { type: [String] },
});

const EventListSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  name: { type: String },
  events: { type: [String] },
  date: { type: Date },
});

const PlaceListSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  name: { type: String },
  places: { type: [String] },
  date: { type: Date },
});

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  visiting_events: { type: [EventListSchema] },
  visiting_places: { type: [PlaceListSchema] },
  favorite_events: { type: [EventSchema] },
  favorite_places: { type: [PlaceSchema] },
});

const CommentSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  target_id: { type: String },
  content: { type: String, required: true },
  date: { type: Date, required: true },
  likes: { type: Number },
});

mongoose.model("User", UserSchema);
mongoose.model("Event", EventSchema);
mongoose.model("Place", PlaceSchema);
mongoose.model("EventList", EventListSchema);
mongoose.model("PlaceList", PlaceListSchema);
mongoose.model("Comment", CommentSchema);

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
/*
 * event api service
 */
const event = require("./api/event");
app.use("/api/v1/event", event);
/*
 * place api service
 */
const place = require("./api/place");
app.use("/api/v1/place", place);
/*
 * eventlist api service
 */
const eventList = require("./api/eventList");
app.use("/api/v1/eventlist", eventList);
/*
 * placelist api service
 */
const placeList = require("./api/placeList");
app.use("/api/v1/placelist", placeList);
/*
 * comment api service
 */
const comment = require("./api/comment");
app.use("/api/v1/comment", comment);

app.get("/", (req, res) => {
  res.send("Hello World!!");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("server is running on... " + port);
});
