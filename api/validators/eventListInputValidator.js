const inputTypes = require("../inputTypes/eventList");
const DateTime = require("luxon").DateTime;
module.exports = ({ user_id, name, events, date }) => {
  if (!user_id) return { isValid: false, type: inputTypes.USER_ID };
  if (!name) return { isValid: false, type: inputTypes.NAME };
  if (!events) return { isValid: false, type: inputTypes.EVENTS };
  if (date) {
    const d = DateTime.fromISO(date);
    if (!d.isValid) return { isValid: false, type: inputTypes.DATE };
  } else {
    return { isValid: false, type: inputTypes.DATE };
  }
  return { isValid: true, type: undefined };
};
