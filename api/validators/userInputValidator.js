const mongoose = require("mongoose");
const UserModel = mongoose.model("User");
const inputTypes = require("../inputTypes/user");

module.exports = async ({
  username,
  first_name,
  last_name,
  email,
  password,
}) => {
  /* Input validation */
  if (!username) return { isValid: false, type: inputTypes.USERNAME };
  if (!first_name) return { isValid: false, type: inputTypes.FIRST_NAME };
  if (!last_name) return { isValid: false, type: inputTypes.LASTNAME };
  if (!email) return { isValid: false, type: inputTypes.EMAIL };
  if (!password) return { isValid: false, type: inputTypes.PASSWORD };
  if (await UserModel.findOne({ username }).exec())
    return { isValid: false, type: inputTypes.USERNAME };
  if (await UserModel.findOne({ email }).exec())
    return { isValid: false, type: inputTypes.EMAIL };

  return { isValid: true, type: null };
};
