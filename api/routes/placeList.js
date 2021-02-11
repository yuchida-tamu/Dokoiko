/*
 * placelist api
 * /api/v1/placelist
 */
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const inputTypes = require("../inputTypes/placeList");

const PlaceListModel = mongoose.model("PlaceList");

router.route("/").get(async (req, res) => {
  try {
    const lists = await PlaceListModel.find();
    return res.status(200).json({
      status: "SUCCESS",
      msg: "fetched lists successfully",
      lists: lists,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ status: "FAIL", msg: "failed to fetch lists", error: err });
  }
});

router.route("/new").post(async (req, res) => {
  const validation = validateInputs(req.body);
  if (validation.isValid) {
    try {
      const newPlaceList = new PlaceListModel({
        user_id: req.body.user_id,
        name: req.body.name,
        places: req.body.places,
      });

      const saved = await newPlaceList.save();
      return res.status(200).json({
        status: "SUCCESS",
        msg: "created a new list",
        list: saved,
      });
    } catch (err) {
      return res.status(500).json({
        status: "FAIL",
        msg: "failed to create a list",
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
  .get(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid)
      return res.status(300).json({ status: "FAIL", msg: "invalid id format" });

    try {
      const list = await PlaceListModel.findOne({ _id: id });
      return res.status(200).json({
        status: "SUCCESS",
        msg: "fetched the list successfully",
        list: list,
      });
    } catch (err) {
      return res.status(500).json({
        status: "FAIL",
        msg: "failed to fetch the list",
        error: err,
      });
    }
  })
  .put(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid)
      return res.status(300).json({ status: "FAIL", msg: "invalid id format" });

    const validation = validateInputs(req.body);
    if (validation.isValid) {
      const options = { new: true, useFindAndModify: false };
      try {
        const updates = {
          user_id: req.body.user_id,
          name: req.body.name,
          places: req.body.places,
        };

        const updated = await PlaceListModel.findOneAndUpdate(
          { _id: id },
          updates,
          options
        ).exec();
        return res.status(200).json({
          status: "SUCCESS",
          msg: "updated the list",
          list: updated,
        });
      } catch (err) {
        return res.status(500).json({
          status: "FAIL",
          msg: "failed to update a list",
          error: err,
        });
      }
    }

    return res
      .status(400)
      .json({ status: "FAIL", msg: `invalid input: ${validation.type}` });
  })
  .delete(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid)
      return res.status(300).json({ status: "FAIL", msg: "invalid id format" });

    try {
      const deleted = await PlaceListModel.findByIdAndRemove({
        _id: id,
      }).exec();
      return res.status(200).json({
        status: "SUCCESS",
        msg: "deleted the list successfully",
        list: deleted,
      });
    } catch (err) {
      return res
        .status(500)
        .json({ status: "FAIL", msg: "failed to delete the list", error: err });
    }
  });

router.route("/user/:id").get(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ status: "FAIL", msg: "invalid id format" });

  try {
    const placelists = await PlaceListModel.find({ user_id: id });
    return res.status(200).json({
      status: "SUCCESS",
      msg: "fetched placelists of the user",
      lists: placelists,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ status: "FAIL", msg: "failed to fetch a list", error: err });
  }
});

const validateInputs = ({ user_id, name, places }) => {
  if (!user_id) return { isValid: false, type: inputTypes.USER_ID };
  if (!name) return { isValid: false, type: inputTypes.NAME };
  if (!places) return { isValid: false, type: inputTypes.PLACES };

  return { isValid: true, type: undefined };
};

module.exports = router;
