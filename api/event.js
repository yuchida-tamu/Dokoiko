const express = require("express");
const mongoose = require("mongoose");
const inputTypes = require("./inputTypes/event");
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

router.route("/new").post(async (req, res) => {
  const {
    list_id,
    place_id,
    name,
    description,
    dateStart,
    dateEnd,
    photos,
  } = req.body;

  const validation = validateInputs(req.body);
  if (validation.isValid) {
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
  }

  return res
    .status(300)
    .json({ status: "FAIL", msg: `invalid input: ${validation.type}` });
});

router
  .route("/:id")
  .get(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(300).json({ status: "FAIL", msg: "invalid id form" });
    }

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
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(300).json({ status: "FAIL", msg: "invalid id form" });
    }

    const validation = validateInputs(req.body);
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
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(300).json({ status: "FAIL", msg: "invalid id form" });
    }

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

const validateInputs = ({
  list_id,
  place_id,
  name,
  description,
  dateStart,
  dateEnd,
}) => {
  if (!list_id) return { isValid: false, type: inputTypes.LIST_ID };
  if (!place_id) return { isValid: false, type: inputTypes.PLACE_ID };
  if (!name || name.length === 0)
    return { isValid: false, type: inputTypes.NAME };
  if (!description) return { isValid: false, type: inputTypes.DESCRIPTION };
  if (!dateStart) return { isValid: false, type: inputTypes.DATE_START };
  if (!dateEnd) return { isValid: false, type: inputTypes.DATE_END };

  return { isValid: true, type: null };
};

module.exports = router;
