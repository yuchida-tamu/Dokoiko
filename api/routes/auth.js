const passport = require("passport");
const bodyParser = require("body-parser");
const express = require("express");
const router = express.Router();

module.exports = (app) => {
  app.post("/api/v1/auth/login", passport.authenticate("local"), (req, res) => {
    res.json({
      user: req.user,
    });
  });

  app.get("/api/v1/auth/logout", (req, res) => {
    req.logout();
    res.status(200).json({ status: "SUCCESS", msg: "logged out successfully" });
  });
};
