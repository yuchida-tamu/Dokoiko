const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String },
  first_name: { type: String },
  last_name: { type: String },
  email: { type: String },
  password: { type: String },
  visiting_events: { type: [EventList] },
  visiting_places: { type: [PlaceList] },
  favorite_events: { type: [EventSchema] },
  favorite_places: { type: [PlaceSchema] },
});

mongoose.model("User", UserSchema);
