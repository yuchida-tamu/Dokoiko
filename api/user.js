/*
 * user api
 * /api/v1/user
 */
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const UserModel = mongoose.model("User");

router.route("/").get(async (req, res) => {
  try {
    const users = await UserModel.find();
    res
      .status(200)
      .json({ status: "SUCCESS", msg: "fetched users", user: users });
  } catch (err) {
    res
      .status(500)
      .json({ status: "FAIL", msg: "could not fetch users", error: err });
  }
});

router.route("/new").post(async (req, res) => {
  const { username, first_name, last_name, email, password } = req.body;
  /* Input validation */
  if (!username)
    res.status(300).json({ status: "FAIL", msg: "username is missing" });
  if (!first_name)
    res.status(300).json({ status: "FAIL", msg: "first_name is missing" });
  if (!last_name)
    res.status(300).json({ status: "FAIL", msg: "last_name is missing" });
  if (!email) res.status(300).json({ status: "FAIL", msg: "email is missing" });
  if (!password)
    res.status(300).json({ status: "FAIL", msg: "password is missing" });

  if (await UserModel.findOne({ username }).exec())
    return res.status(300).json({
      status: "FAIL",
      msg: "user with the same username already exists",
    });

  if (await UserModel.findOne({ email }).exec())
    return res.status(300).json({
      status: "FAIL",
      msg: "the email is already used",
    });
  /* Input validation END */

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
    res.status(200).json({
      status: "SUCCESS",
      msg: "created a new user successfully",
      user: userSaved,
    });
  } catch (err) {
    res
      .status(500)
      .json({ status: "FAIL", msg: "could not create a new user", error: err });
  }
});

router
  .route("/:id")
  .get(async (req, res) => {
    const { id } = req.params;
    /* validate input */
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(300).json({ status: "FAIL", msg: "invalid id format" });
    }

    try {
      const fetchedUser = await UserModel.findById(id);
      res.status(200).json({
        status: "SUCCESS",
        msg: "fetched the user",
        user: fetchedUser,
      });
    } catch (err) {
      res
        .status(500)
        .json({ status: "FAIL", msg: "could not fetch the user", error: err });
    }
  })
  .put(async (req, res) => {
    const { id } = req.params;
    const { username, first_name, last_name, email, password } = req.body;
    /* Input validation */
    if (!username)
      res.status(300).json({ status: "FAIL", msg: "username is missing" });
    if (!first_name)
      res.status(300).json({ status: "FAIL", msg: "first_name is missing" });
    if (!last_name)
      res.status(300).json({ status: "FAIL", msg: "last_name is missing" });
    if (!email)
      res.status(300).json({ status: "FAIL", msg: "email is missing" });
    if (!password)
      res.status(300).json({ status: "FAIL", msg: "password is missing" });
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(300).json({ status: "FAIL", msg: "invalid id format" });
    }

    const findUsername = await UserModel.findOne({ username: username }).exec();
    /*Check if a new username is already used for other users */
    const findEmail = await UserModel.findOne({ email: email }).exec();
    if (findUsername) {
      if (findUsername._id != id) {
        return res.status(300).json({
          status: "FAIL",
          msg: "user with the same username already exists",
        });
      }
    }
    /*Check is a new email is already used for other users */
    if (findEmail) {
      console.log(id);
      console.log(findEmail._id);
      if (findEmail._id != id) {
        return res.status(300).json({
          status: "FAIL",
          msg: "the email is already used",
        });
      }
    }
    const options = { new: true, useFindAndModify: false };

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

      res.status(200).json({
        status: "SUCCESS",
        msg: "updated the user",
        user: updatedUser,
      });
    } catch (err) {
      res
        .status(500)
        .json({ status: "FAIL", msg: "could not update the user", error: err });
    }
  })
  .delete(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(300).json({ status: "FAIL", msg: "invalid id format" });
    }

    try {
      const deleted = UserModel.findOneAndRemove({ _id: id }).exec();
      res.status(200).json({
        status: "SUCCESS",
        msg: "deleted the user",
        user: deleted,
      });
    } catch (err) {
      res
        .status(500)
        .json({ status: "FAIL", msg: "could not delete the user", error: err });
    }
  });

module.exports = router;
