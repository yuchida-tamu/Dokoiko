module.exports = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({ error: "you must log in" });
  }
  //if the user is logged in, move on to next middleware
  next();
};
