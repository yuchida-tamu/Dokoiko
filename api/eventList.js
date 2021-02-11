/*
 * eventlist api
 * /api/v1/eventlist
 */
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const inputTypes = require("./inputTypes/eventList");
const DateTime = require("luxon").DateTime;
const requireLogin = require("../middlewares/requireLogin");
const EventListModel = mongoose.model("EventList");

router
  .route("/")
  .all(requireLogin, (req, res, next) => {
    next();
  })
  .get(async (req, res) => {
    try {
      const eventLists = await EventListModel.find({});
      res.status(200).json({
        status: "SUCCESS",
        msg: "fetched all event lists",
        lists: eventLists,
      });
    } catch (err) {
      res.status(500).json({
        status: "FAIL",
        msg: "failed to fetch event lists",
        error: err,
      });
    }
  });

router
  .route("/new")
  .all(requireLogin, (req, res, next) => {
    next();
  })
  .post(async (req, res) => {
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
        return res.status(500).json({
          status: "FAIL",
          msg: "failed to save a new list",
          error: err,
        });
      }
    }
    return res
      .status(400)
      .json({ status: "FAIL", msg: `invalid input: ${validation.type}` });
  });

router
  .route("/:id")
  .all(requireLogin, (req, res, next) => {
    next();
  })
  .get(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ status: "FAIL", msg: "invalid id format" });

    try {
      const list = await EventListModel.findById(id);
      return res.status(200).json({
        status: "SUCCESS",
        msg: "fetched the eventlist successfully",
        list: list,
      });
    } catch (err) {
      return res.status(500).json({
        status: "FAIL",
        msg: "failed to fetch the eventlist",
        error: err,
      });
    }
  })
  .put(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ status: "FAIL", msg: "invalid id format" });

    const validation = validateInputs(req.body);
    if (validation.isValid) {
      const updates = {
        user_id: req.body.user_id,
        name: req.body.name,
        events: [...req.body.events],
        date: req.body.date,
      };

      const options = { new: true, useFindAndModify: false };

      try {
        const updated = await EventListModel.findOneAndUpdate(
          { _id: id },
          updates,
          options
        ).exec();
        return res.status(200).json({
          status: "SUCCESS",
          msg: "updated a new event list",
          list: updated,
        });
      } catch (err) {
        return res.status(500).json({
          status: "FAIL",
          msg: "failed to update a new list",
          error: err,
        });
      }
    }
  })
  .delete(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ status: "FAIL", msg: "invalid id format" });

    try {
      const deleted = await EventListModel.findOneAndRemove({ _id: id }).exec();
      res.status(200).json({
        status: "SUCCESS",
        msg: "deleted the eventlist",
        list: deleted,
      });
    } catch (err) {
      return res.status(500).json({
        status: "FAIL",
        msg: "failed to delete the list",
        error: err,
      });
    }
  });

router
  .route("/user/:id")
  .all(requireLogin, (req, res, next) => {
    next();
  })
  .get(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ status: "FAIL", msg: "invalid id format" });
    try {
      const eventlists = await EventListModel.find({ user_id: id });
      res.status(200).json({
        status: "SUCCESS",
        msg: "fetched eventlists of the user",
        lists: eventlists,
      });
    } catch (err) {
      res
        .status(500)
        .json({ status: "FAIL", msg: "failed to fetch a list", error: err });
    }
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
