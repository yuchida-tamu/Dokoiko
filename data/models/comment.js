const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  target_id: { type: String },
  content: { type: String, required: true },
  date: { type: Date, required: true },
  likes: { type: Number },
});

mongoose.model("Comment", CommentSchema);
