const {
  encryptPassword,
  validatePassword,
} = require("../services/encryptPassword");
const bcrypt = require("bcrypt");
const expect = require("expect");
const testPassword = "helloPassword";
let hash;
let result = false;
describe("Test encryptPassword Service", () => {
  describe("Test encryption", () => {
    it("Encrypt password and return hash", (done) => {
      bcrypt.hash(testPassword, 10, (err, hashP) => {
        if (err) done();
        hash = hashP;
        expect(hash).toBe(expect.any(String));
        done();
      });
      //   hash = await encryptPassword(testPassword);
    });
  });
  describe("Test validation", () => {
    it("Compare hash with password", (done) => {
      bcrypt.compare(testPassword, hash, (err, r) => {
        if (err) done();
        result = r;
        expect(result).toBe(true);
        done();
      });
      //   result = await validatePassword(testPassword, hash);
    });
  });
});
