import rawdata from "./rawplaces.json";

//const processedData = JSON.parse(...rawdata);
const dataInArray = [...rawdata];
export const testPlaceNew = dataInArray.map((d, index) => {
  return {
    id: "testid" + index,
    name: d.name,
    description: "Test description " + index,
    events: [],
    address: d.formatted_address,
    location: {
      lat: d.location.lat,
      lng: d.location.lng,
    },
    types: [...d.types],
    place_id: d.place_id,
    photos: [],
  };
});

export const testPlace = [
  {
    id: "testid1",
    name: "Test Place",
    description:
      "This is a test Place. Please visit us at your convenience. It is at a hypothetical venue.",
    events: [],
    address: "test address",
    location: { lat: "test", lng: "test" },
    types: ["gallery"],
    place: "place_id",
    photos: [],
  },
  {
    id: "testid2",
    name: "Test Place",
    description:
      "This is a test Place. Please visit us at your convenience. It is at a hypothetical venue.",
    events: [],
    address: "test address",
    location: { lat: "test", lng: "test" },
    types: ["gallery"],
    place: "place_id",
    photos: [],
  },
  {
    id: "testid3",
    name: "Test Place",
    description:
      "This is a test Place. Please visit us at your convenience. It is at a hypothetical venue.",
    events: [],
    address: "test address",
    location: { lat: "test", lng: "test" },
    types: ["gallery"],
    place: "place_id",
    photos: [],
  },
  {
    id: "testid4",
    name: "Test Place",
    description:
      "This is a test Place. Please visit us at your convenience. It is at a hypothetical venue.",
    events: [],
    address: "test address",
    location: { lat: "test", lng: "test" },
    types: ["gallery"],
    place: "place_id",
    photos: [],
  },
  {
    id: "testid5",
    name: "Test Place",
    description:
      "This is a test Place. Please visit us at your convenience. It is at a hypothetical venue.",
    events: [],
    address: "test address",
    location: { lat: "test", lng: "test" },
    types: ["gallery"],
    place: "place_id",
    photos: [],
  },
  {
    id: "testid6",
    name: "Test Place",
    description:
      "This is a test Place. Please visit us at your convenience. It is at a hypothetical venue.",
    events: [],
    address: "test address",
    location: { lat: "test", lng: "test" },
    types: ["gallery"],
    place: "place_id",
    photos: [],
  },
  {
    id: "testid7",
    name: "Test Place",
    description:
      "This is a test Place. Please visit us at your convenience. It is at a hypothetical venue.",
    events: [],
    address: "test address",
    location: { lat: "test", lng: "test" },
    types: ["gallery"],
    place: "place_id",
    photos: [],
  },
  {
    id: "testid8",
    name: "Test Place",
    description:
      "This is a test Place. Please visit us at your convenience. It is at a hypothetical venue.",
    events: [],
    address: "test address",
    location: { lat: "test", lng: "test" },
    types: ["gallery"],
    place: "place_id",
    photos: [],
  },
  {
    id: "testid9",
    name: "Test Place",
    description:
      "This is a test Place. Please visit us at your convenience. It is at a hypothetical venue.",
    events: [],
    address: "test address",
    location: { lat: "test", lng: "test" },
    types: ["gallery"],
    place: "place_id",
    photos: [],
  },
  {
    id: "testid10",
    name: "Test Place",
    description:
      "This is a test Place. Please visit us at your convenience. It is at a hypothetical venue.",
    events: [],
    address: "test address",
    location: { lat: "test", lng: "test" },
    types: ["gallery"],
    place: "place_id",
    photos: [],
  },
];
