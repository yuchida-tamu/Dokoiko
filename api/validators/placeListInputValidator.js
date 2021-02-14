const inputTypes = require("../inputTypes/eventList");

module.exports = ({ user_id, name, places }) => {
  if (!user_id) return { isValid: false, type: inputTypes.USER_ID };
  if (!name) return { isValid: false, type: inputTypes.NAME };
  if (!places) return { isValid: false, type: inputTypes.PLACES };

  return { isValid: true, type: undefined };
};
