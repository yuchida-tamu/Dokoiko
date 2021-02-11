/*
 * user api
 * /api/v1/user
 */
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const validator = require("../validators/userInputValidator");
const UserModel = mongoose.model("User");
const options = { new: true, useFindAndModify: false };

router.route("/").get(async (req, res) => {
  try {
    const users = await UserModel.find();
    return res
      .status(200)
      .json({ status: "SUCCESS", msg: "fetched users", users: users });
  } catch (err) {
    return res
      .status(500)
      .json({ status: "FAIL", msg: "could not fetch users", error: err });
  }
});

router
  .route("/new")
  .all(async (req, res, next) => {
    const validation = await validator(req.body);

    if (!validation.isValid)
      return res
        .status(400)
        .json({ status: "FAIL", msg: `invalid input :${validation.type}` });
    next();
  })
  .post(async (req, res) => {
    const { username, first_name, last_name, email, password } = req.body;

    const newUser = new UserModel({
      username,
      first_name,
      last_name,
      email,
      password,
      visiting_events: [],
      visiting_places: [],
      favorite_events: [],
      favorite_places: [],
    });

    try {
      const userSaved = await newUser.save();
      return res.status(200).json({
        status: "SUCCESS",
        msg: "created a new user successfully",
        user: userSaved,
      });
    } catch (err) {
      return res.status(500).json({
        status: "FAIL",
        msg: "could not create a new user",
        error: err,
      });
    }
  });

router
  .route("/:id")
  .all(async (req, res, next) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(300).json({ status: "FAIL", msg: "invalid id format" });
    }
    next();
  })
  .get(async (req, res) => {
    const { id } = req.params;

    try {
      const fetchedUser = await UserModel.findById(id);
      return res.status(200).json({
        status: "SUCCESS",
        msg: "fetched the user",
        user: fetchedUser,
      });
    } catch (err) {
      return res
        .status(500)
        .json({ status: "FAIL", msg: "could not fetch the user", error: err });
    }
  })
  .put(async (req, res) => {
    const { username, first_name, last_name, email, password } = req.body;
    const { id } = req.params;
    const validation = await validator(req.body);

    if (!validation.isValid)
      return res
        .status(400)
        .json({ status: "FAIL", msg: `invalid input :${validation.type}` });

    try {
      const updates = {
        username,
        first_name,
        last_name,
        email,
        password,
      };

      const updatedUser = await UserModel.findOneAndUpdate(
        { _id: id },
        { ...updates },
        options
      ).exec();

      return res.status(200).json({
        status: "SUCCESS",
        msg: "updated the user",
        user: updatedUser,
      });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ status: "FAIL", msg: "could not update the user", error: err });
    }
  })
  .delete(async (req, res) => {
    const { id } = req.params;

    try {
      const deleted = UserModel.findOneAndRemove({ _id: id }, options).exec();
      return res.status(200).json({
        status: "SUCCESS",
        msg: "deleted the user",
        user: deleted,
      });
    } catch (err) {
      return res
        .status(500)
        .json({ status: "FAIL", msg: "could not delete the user", error: err });
    }
  });

module.exports = router;
