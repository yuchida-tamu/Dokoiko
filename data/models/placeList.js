const mongoose = require("mongoose");

const PlaceListSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  name: { type: String },
  places: { type: [String] },
  date: { type: Date },
});

mongoose.model("PlaceList", PlaceListSchema);
