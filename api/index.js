const bodyParser = require("body-parser");

module.exports = (app) => {
  /*
   * auth
   */
  require("../config/passport");
  app.use(bodyParser.urlencoded({ extended: false }));
  require("./auth")(app);
  /*
   * user api service
   */
  const user = require("./user");
  app.use("/api/v1/user", user);
  /*
   * event api service
   */
  const event = require("./event");
  app.use("/api/v1/event", event);
  /*
   * place api service
   */
  const place = require("./place");
  app.use("/api/v1/place", place);
  /*
   * eventlist api service
   */
  const eventList = require("./eventList");
  app.use("/api/v1/eventlist", eventList);
  /*
   * placelist api service
   */
  const placeList = require("./placeList");
  app.use("/api/v1/placelist", placeList);
  /*
   * comment api service
   */
  const comment = require("./comment");
  app.use("/api/v1/comment", comment);
};
