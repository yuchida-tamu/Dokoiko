require("dotenv").config();
const cookieSession = require("cookie-session");
module.exports = (app) => {
  //configure cookie
  app.use(
    cookieSession({
      maxAge: 30 * 24 * 60 * 60 * 1000, //30days in milliseconds
      keys: [process.env.COOKIE_KEY],
    })
  );
};
