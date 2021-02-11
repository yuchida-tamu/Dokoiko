require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const apiRoutes = require("./api");
const passport = require("passport");
const app = express();

/*
 * MongoDB Data Models
 */
require("./data/models/user");
require("./data/models/event");
require("./data/models/place");
require("./data/models/eventList");
require("./data/models/placeList");
require("./data/models/comment");

/*
 * Allow CORS
 */
app.use(cors());
/*
 * Parses request body (json)
 */
app.use(bodyParser.json());
/*
 * Configure cookie
 */
require("./config/cookie")(app);
//enable cookie
app.use(passport.initialize());
app.use(passport.session());
/*
 * API Routes
 */
apiRoutes(app);
/*
 * Root Path
 */
app.get("/", (req, res) => {
  res.send("Hello World!!");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("server is running on... " + port);
});

module.exports = app;
