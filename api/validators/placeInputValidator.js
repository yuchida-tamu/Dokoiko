const inputTypes = require("../inputTypes/place");

module.exports = ({
  place_id,
  name,
  events,
  address,
  location,
  photos,
  types,
}) => {
  if (!events) return { isValid: false, type: inputTypes.EVENTS };
  if (!place_id) return { isValid: false, type: inputTypes.PLACE_ID };
  if (!name || name.length === 0)
    return { isValid: false, type: inputTypes.NAME };
  if (!address) return { isValid: false, type: inputTypes.ADDRESS };
  if (!location) return { isValid: false, type: inputTypes.LOCATION };
  if (!location.lat) return { isValid: false, type: inputTypes.LAT };
  if (!location.lng) return { isValid: false, type: inputTypes.LNG };
  if (!photos) return { isValid: false, type: inputTypes.PHOTOS };
  if (!types) return { isValid: false, type: inputTypes.TYPES };
  return { isValid: true, type: null };
};
