/*
 * user api
 * /api/v1/user
 */
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const UserModel = mongoose.model("User");

router.route("/").get((req, res) => {
  res.send("User API...");
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

router.route("/:id").get(async (req, res) => {
  const { id } = req.params;
  /* validate input */
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(300).json({ status: "FAIL", msg: "invalid id format" });
  }

  try {
    const fetchedUser = await UserModel.findById(id);
    res
      .status(200)
      .json({ status: "SUCCESS", msg: "fetched the user", user: fetchedUser });
  } catch (err) {
    res
      .status(500)
      .json({ status: "FAIL", msg: "could not fetch the user", error: err });
  }
});

module.exports = router;