const expect = require("expect");
const closeDB = require("../data/closeDB");
const connectDB = require("../data/connectDB");

const TEST_OBJECT = {
  username: "tamu-s2sa",
  first_name: "Tamu2",
  last_name: "Uchida",
  email: "yutaexae@email.com",
  password: "XXXXXXXX",
};

before(() => {
  connectDB(false);
  require("../data/models/user");
});

describe("Test userInputValidator", () => {
  it("it should return an object with isValid true", async () => {
    const userInputValidator = require("../api/validators/userInputValidator");
    const result = await userInputValidator(TEST_OBJECT);
    expect(result.isValid).toBe(true);
  });
});

after(() => {
  closeDB();
});
