module.exports = (req, res, next) => {
  if (!req.session.currentUser) {
    res.redirect('/');
    //return res.status(401).send({ error: "you must log in" });
  }
  console.log('requireLogin:', req.session.currentUser);
  //if the user is logged in, move on to next middleware
  next();
};
