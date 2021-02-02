/*
 * place api
 * /api/v1/place
 */
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const inputTypes = require("./inputTypes/eventList");
const DateTime = require("luxon").DateTime;

const EventListModel = mongoose.model("EventList");

router.route("/").get(async (req, res) => {
  try {
    const eventLists = await EventListModel.find({});
    res.status(200).json({
      status: "SUCCESS",
      msg: "fetched all event lists",
      lists: eventLists,
    });
  } catch (err) {
    res
      .status(500)
      .json({ status: "FAIL", msg: "failed to fetch event lists", error: err });
  }
});

router.route("/new").post(async (req, res) => {
  const validation = validateInputs(req.body);
  if (validation.isValid) {
    const newEventList = new EventListModel({
      user_id: req.body.user_id,
      name: req.body.name,
      events: [...req.body.events],
      date: req.body.date,
    });

    try {
      const saved = await newEventList.save();
      return res.status(200).json({
        status: "SUCCESS",
        msg: "saved a new event list",
        list: saved,
      });
    } catch (err) {
      return res
        .status(500)
        .json({ status: "FAIL", msg: "failed to save a new list", error: err });
    }
  }
  return res
    .status(400)
    .json({ status: "FAIL", msg: `invalid input: ${validation.type}` });
});

const validateInputs = ({ user_id, name, events, date }) => {
  if (!user_id) return { isValid: false, type: inputTypes.USER_ID };
  if (!name) return { isValid: false, type: inputTypes.NAME };
  if (!events) return { isValid: false, type: inputTypes.EVENTS };
  if (date) {
    const d = DateTime.fromISO(date);
    if (!d.isValid) return { isValid: false, type: inputTypes.DATE };
  } else {
    return { isValid: false, type: inputTypes.DATE };
  }
  return { isValid: true, type: undefined };
};

module.exports = router;
