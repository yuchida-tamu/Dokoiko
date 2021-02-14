/*
 * place api
 * /api/v1/place
 */
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const inputTypes = require("../inputTypes/place");

const PlaceModel = mongoose.model("Place");

router.route("/").get(async (req, res) => {
  try {
    const places = await PlaceModel.find({});
    return res
      .status(200)
      .json({ status: "SUCCESS", msg: "fetched all places", places: places });
  } catch (err) {
    return res
      .status(500)
      .json({ status: "FAIL", msg: "couldn't fetch places", error: err });
  }
});

router.route("/new").post(async (req, res) => {
  const validation = validateInputs(req.body);
  if (validation.isValid) {
    const newPlace = new PlaceModel({
      place_id: req.body.place_id,
      name: req.body.name,
      events: req.body.events,
      address: req.body.address,
      location: req.body.location,
      photos: req.body.photos,
      types: req.body.types,
    });
    try {
      const saved = await newPlace.save();
      return res.status(200).json({
        status: "SUCCESS",
        msg: "created a new place",
        place: saved,
      });
    } catch (err) {
      return res
        .status(500)
        .json({ status: "FAIL", msg: "couldn't save the place", error: err });
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
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(300).json({ status: "FAIL", msg: "invalid id format" });

    try {
      const place = await PlaceModel.findById(id);
      return res.status(200).json({
        status: "SUCCESS",
        msg: "fetched the place successfully",
        place: place,
      });
    } catch (err) {
      return res
        .status(500)
        .json({ status: "FAIL", msg: "couldn't find the places", error: err });
    }
  })
  .put(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(300).json({ status: "FAIL", msg: "invalid id format" });

    const validation = validateInputs(req.body);

    if (validation.isValid) {
      const updates = {
        place_id: req.body.place_id,
        name: req.body.name,
        events: req.body.events,
        address: req.body.address,
        location: req.body.location,
        photos: req.body.photos,
        types: req.body.types,
      };

      const options = { new: true, useFindAndModify: false };

      try {
        const updated = await PlaceModel.findOneAndUpdate(
          { _id: id },
          updates,
          options
        ).exec();
        return res.status(200).json({
          status: "SUCCESS",
          msg: "created a new place",
          place: updated,
        });
      } catch (err) {
        return res.status(500).json({
          status: "FAIL",
          msg: "couldn't update the place",
          error: err,
        });
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
      const deleted = await PlaceModel.findOneAndRemove({ _id: id }).exec();
      res
        .status(200)
        .json({ status: "SUCCESS", msg: "deleted the place", place: deleted });
    } catch (err) {
      res
        .status(500)
        .json({ status: "FAIL", msg: "couldn't delete the place" });
    }
  });

const validateInputs = ({
  place_id,
  name,
  events,
  address,
  location,
  photos,
  types,
}) => {
  if (!events) return { isValid: false, type: inputTypes.EVENTS };
  if (!place_id) return { isValid: false, type: inputTypes.PLACE_ID };
  if (!name || name.length === 0)
    return { isValid: false, type: inputTypes.NAME };
  if (!address) return { isValid: false, type: inputTypes.ADDRESS };
  if (!location) return { isValid: false, type: inputTypes.LOCATION };
  if (!location.lat) return { isValid: false, type: inputTypes.LAT };
  if (!location.lng) return { isValid: false, type: inputTypes.LNG };
  if (!photos) return { isValid: false, type: inputTypes.PHOTOS };
  if (!types) return { isValid: false, type: inputTypes.TYPES };
  return { isValid: true, type: null };
};

module.exports = router;
