const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  list_id: { type: String },
  place_id: { type: String },
  name: { type: String, required: true },
  description: { type: String },
  dateStart: { type: Date },
  dateEnd: { type: Date },
  photos: { type: [String] },
});

mongoose.model("Event", EventSchema);
