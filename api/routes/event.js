const express = require("express");
const mongoose = require("mongoose");
const inputTypes = require("../inputTypes/event");
const DateTime = require("luxon").DateTime;
const router = express.Router();
const requireLogin = require("../../middlewares/requireLogin");
const validator = require("../validators/eventInputValidator");
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

router
  .route("/new")
  .all(requireLogin, (req, res, next) => {
    const validation = validator(req.body);
    if (!validation.isValid)
      return res
        .status(300)
        .json({ status: "FAIL", msg: `invalid input: ${validation.type}` });
    next();
  })
  .post(async (req, res) => {
    const {
      list_id,
      place_id,
      name,
      description,
      dateStart,
      dateEnd,
      photos,
    } = req.body;

    const newEvent = new EventModel({
      list_id,
      place_id,
      name,
      description,
      dateStart,
      dateEnd,
      photos: photos ? photos : [],
    });

    try {
      const saved = await newEvent.save();
      return res
        .status(200)
        .json({ status: "SUCCESS", msg: "an event saved!", event: saved });
    } catch (err) {
      return res
        .status(500)
        .json({ status: "FAIL", msg: "failed to save an event", error: err });
    }
  });

router
  .route("/:id")
  .all((req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(300).json({ status: "FAIL", msg: "invalid id form" });
    }
    next();
  })
  .get(async (req, res) => {
    const { id } = req.params;

    try {
      const event = await EventModel.findById(id);
      return res.status(200).json({
        status: "SUCCESS",
        msg: "fetched the event successfully",
        event: event,
      });
    } catch (err) {
      res
        .status(500)
        .json({ status: "FAIL", msg: "could not fetch the event" });
    }
  })
  .put(async (req, res) => {
    const { id } = req.params;

    const validation = validator(req.body);
    if (validation.isValid) {
      const update = {
        list_id: req.body.list_id,
        place_id: req.body.place_id,
        name: req.body.name,
        description: req.body.description,
        dateStart: req.body.dateStart,
        dateEnd: req.body.dateEnd,
        photos: req.body.photos,
      };
      const options = { new: true, useFindAndModify: false };

      try {
        const updated = await EventModel.findOneAndUpdate(
          { _id: id },
          update,
          options
        ).exec();
        return res.status(200).json({
          status: "SUCCESS",
          msg: "updated the event successfully",
          event: updated,
        });
      } catch (err) {
        return res
          .status(500)
          .json({ status: "FAIL", msg: "failed to update the event" });
      }
    }
    return res
      .status(300)
      .json({ status: "FAIL", msg: `invalid input: ${validation.type}` });
  })
  .delete(async (req, res) => {
    const { id } = req.params;

    try {
      const deleted = await EventModel.findOneAndRemove({ _id: id }).exec();
      res
        .status(200)
        .json({ status: "SUCCESS", msg: "deleted the event", event: deleted });
    } catch (err) {
      res
        .status(500)
        .json({ status: "FAIL", msg: "couldn't delete the event" });
    }
  });

router.route("/place/:placeId").get(async (req, res) => {
  const { placeId } = req.params;
  try {
    const events = await EventModel.find({ place_id: placeId });
    return res.status(200).json({
      status: "SUCCESS",
      msg: "fetched events at the place",
      events: events,
    });
  } catch (err) {
    return res.status(500).json({
      status: "FAIL",
      msg: "failed to fetch events",
      error: err,
    });
  }
});

router.route("/date/start").get(async (req, res) => {
  const { dateStart } = req.body;

  try {
    const events = await EventModel.find({ dateStart: dateStart });
    return res.status(200).json({
      status: "SUCCESS",
      msg: "fetched events on the date",
      events: events,
    });
  } catch (err) {
    return res.status(500).json({
      status: "FAIL",
      msg: "failed to fetch events",
      error: err,
    });
  }
});

router.route("/date/end").get(async (req, res) => {
  const { dateEnd } = req.body;

  try {
    const events = await EventModel.find({ dateEnd: dateEnd });
    return res.status(200).json({
      status: "SUCCESS",
      msg: "fetched events on the date",
      events: events,
    });
  } catch (err) {
    return res.status(500).json({
      status: "FAIL",
      msg: "failed to fetch events",
      error: err,
    });
  }
});

module.exports = router;
