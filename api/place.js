/*
 * place api
 * /api/v1/place
 */
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const PlaceModel = mongoose.model("Place");

router.route("/").get(async (req, res) => {
  try {
    const places = await PlaceModel.find({});
    res
      .status(200)
      .json({ status: "SUCCESS", msg: "fetched all places", places: places });
  } catch (err) {
    res
      .status(500)
      .json({ status: "FAIL", msg: "couldn't fetch places", error: err });
  }
});

module.exports = router;
