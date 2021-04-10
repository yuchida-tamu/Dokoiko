const passport = require('passport');
const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();

module.exports = app => {
  app.post('/auth/login', passport.authenticate('local'), (req, res) => {
    req.session.currentUser = req.user;
    res.json({
      user: req.user,
    });
  });

  app.get('/auth/logout', (req, res) => {
    req.logout();
    res.redirect('/');
    //res.status(200).json({ status: 'SUCCESS', msg: 'logged out successfully' });
  });

  app.get('/auth/current_user', (req, res) => {
    res.json(req.user);
  });
};
