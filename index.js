require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const apiRoutes = require("./api");
const passport = require("passport");
const app = express();

/*
 * Establish a connection to Database
 */
require("./data/connectDB")();

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
 * allow CORS
 */
app.use(cors());
/*
 * parses request body (json)
 */
app.use(bodyParser.json());
//configure cookie
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, //30days in milliseconds
    keys: ["djahdavh12ui32hoijdhiahaaihida"], //Delete
  })
);
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
