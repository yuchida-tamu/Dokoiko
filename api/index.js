const bodyParser = require("body-parser");

module.exports = (app) => {
  /*
   * auth
   */
  require("../config/passport");
  app.use(bodyParser.urlencoded({ extended: false }));
  require("./routes/auth")(app);
  /*
   * user api service
   */
  const user = require("./routes/user");
  app.use("/api/v1/user", user);
  /*
   * event api service
   */
  const event = require("./routes/event");
  app.use("/api/v1/event", event);
  /*
   * place api service
   */
  const place = require("./routes/place");
  app.use("/api/v1/place", place);
  /*
   * eventlist api service
   */
  const eventList = require("./routes/eventList");
  app.use("/api/v1/eventlist", eventList);
  /*
   * placelist api service
   */
  const placeList = require("./routes/placeList");
  app.use("/api/v1/placelist", placeList);
  /*
   * comment api service
   */
  const comment = require("./routes/comment");
  app.use("/api/v1/comment", comment);
};
