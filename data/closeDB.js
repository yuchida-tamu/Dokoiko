require("dotenv").config();
const mongoose = require("mongoose");
module.exports = () => {
  mongoose.connection.close(function () {
    console.log(
      "Mongoose default connection with DB is disconnected through app termination"
    );
    process.exit(0);
  });
};
