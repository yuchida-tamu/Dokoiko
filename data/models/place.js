const mongoose = require("mongoose");

const PlaceSchema = new mongoose.Schema({
  place_id: { type: String },
  name: { type: String },
  events: { type: [EventSchema] },
  address: { type: String },
  location: {
    lat: { type: String },
    lng: { type: String },
  },
  photos: { type: String },
  types: { type: [String] },
});

mongoose.model("Place", PlaceSchema);
