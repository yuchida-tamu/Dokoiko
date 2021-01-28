const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const EventModel = mongoose.model("Event");

router.route("/").get(async (req, res) => {
  try {
    const events = await EventModel.find();
    res.status(200).json({
      status: "SUCESS",
      msg: "events are fetched",
      events: events,
    });
  } catch (err) {
    res.status(500).json({
      status: "FAIL",
      msg: "could not fetch events",
      err: err,
    });
  }
});

module.exports = router;
