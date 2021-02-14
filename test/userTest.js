const expect = require("expect");
const request = require("supertest");
const app = require("../app");
const connectDB = require("../data/connectDB");
const closeDB = require("../data/closeDB");
const URL_BASE = "/api/v1/user";
const TEST_OBJECT = {
  username: "tamu-s2sa",
  first_name: "Tamu2",
  last_name: "Uchida",
  email: "yutaexae@email.com",
  password: "XXXXXXXX",
};

const TEST_UPDATE = {
  username: "tamu-s22sa",
  first_name: "Tamu22",
  last_name: "Uchida2",
  email: "yutaexae222@email.com",
  password: "XXXX",
};
let userId;

before(() => {
  connectDB(false);
});

describe("Server Test User", () => {
  describe("GET: /", () => {
    it("should return an array of user objects", (done) => {
      request(app)
        .get(URL_BASE)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty("users");
        })
        .end(done);
    });
  });
  describe("POST: /new", () => {
    it("should create and return an user document", (done) => {
      request(app)
        .post("/api/v1/user/new")
        .send(TEST_OBJECT)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty("user");
          userId = res.body.user._id;
        })
        .end(done);
    });
  });
  describe("GET: /:id", () => {
    it("should return an user document", (done) => {
      request(app)
        .get("/api/v1/user/" + userId)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty("user");
          expect(res.body.user.username).toBe(TEST_OBJECT.username);
          expect(res.body.user.first_name).toBe(TEST_OBJECT.first_name);
          expect(res.body.user.last_name).toBe(TEST_OBJECT.last_name);
          expect(res.body.user.email).toBe(TEST_OBJECT.email);
          expect(res.body.user.password).toBe(TEST_OBJECT.password);
        })
        .end(done);
    });
  });
  describe("PUT: /:id", () => {
    it("should update and return the updated user document", (done) => {
      request(app)
        .put("/api/v1/user/" + userId)
        .send(TEST_UPDATE)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty("user");
          expect(res.body.user.username).toBe(TEST_UPDATE.username);
          expect(res.body.user.first_name).toBe(TEST_UPDATE.first_name);
          expect(res.body.user.last_name).toBe(TEST_UPDATE.last_name);
          expect(res.body.user.email).toBe(TEST_UPDATE.email);
          expect(res.body.user.password).toBe(TEST_UPDATE.password);
        })
        .end(done);
    });
  });
  describe("DELETE: /:id", () => {
    it("should delete and return the deleted user document", (done) => {
      request(app)
        .delete("/api/v1/user/" + userId)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty("user");
          // expect(res.body.user.username).toBe(TEST_UPDATE.username);
          // expect(res.body.user.first_name).toBe(TEST_UPDATE.first_name);
          // expect(res.body.user.last_name).toBe(TEST_UPDATE.last_name);
          // expect(res.body.user.email).toBe(TEST_UPDATE.email);
          // expect(res.body.user.password).toBe(TEST_UPDATE.password);
        })
        .end(done);
    });
  });
});

after(() => {
  closeDB();
});
