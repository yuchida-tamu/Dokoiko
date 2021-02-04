/*
 * placelist api
 * /api/v1/placelist
 */
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const inputTypes = require("./inputTypes/placeList");

const PlaceListModel = mongoose.model("PlaceList");

router.route("/").get(async (req, res) => {
  try {
    const lists = await PlaceListModel.find();
    res.status(200).json({
      status: "SUCCESS",
      msg: "fetched lists successfully",
      lists: lists,
    });
  } catch (err) {
    res
      .status(500)
      .json({ status: "FAIL", msg: "failed to fetch lists", error: err });
  }
});

module.exports = router;
