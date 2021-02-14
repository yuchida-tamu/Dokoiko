const inputTypes = require("../inputTypes/user");
const DateTime = require("luxon").DateTime;
module.exports = ({
  list_id,
  place_id,
  name,
  description,
  dateStart,
  dateEnd,
}) => {
  if (!list_id) return { isValid: false, type: inputTypes.LIST_ID };
  if (!place_id) return { isValid: false, type: inputTypes.PLACE_ID };
  if (!name || name.length === 0)
    return { isValid: false, type: inputTypes.NAME };
  if (!description) return { isValid: false, type: inputTypes.DESCRIPTION };
  if (!dateStart)
    return { isValid: false, type: inputTypes.DATE_START_MISSING };
  if (!dateEnd) return { isValid: false, type: inputTypes.DATE_END_MISSING };

  const dStart = DateTime.fromISO(dateStart);
  const dEnd = DateTime.fromISO(dateEnd);
  if (!dStart.isValid) return { isValid: false, type: inputTypes.DATE_START };
  if (!dEnd.isValid) return { isValid: false, type: inputTypes.DATE_END };
  if (dEnd < dStart) return { isValid: false, type: inputTypes.DATE_ORDER };
  return { isValid: true, type: null };
};
