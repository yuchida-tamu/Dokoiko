const mongoose = require("mongoose");

const EventListSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  name: { type: String },
  events: { type: [String] },
  date: { type: Date },
});

mongoose.model("EventList", EventListSchema);
