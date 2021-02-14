const expect = require("expect");
const request = require("supertest");
const app = require("../app");
const connectDB = require("../data/connectDB");
const closeDB = require("../data/closeDB");
const URL_BASE = "/api/v1/place";
const TEST_OBJECT = {
  place_id: "Dummy_place_id",
  name: "Test Place Name",
  events: [],
  address: "Test Place Address",
  location: {
    lat: "Test",
    lng: "Test",
  },
  photos: "photourl",
  types: ["art"],
};

const TEST_UPDATE = {
  place_id: "DummyUpdate",
  name: "Test Place Name Updated",
  events: ["testId"],
  address: "Test Place Address update",
  location: {
    lat: "Testupdate",
    lng: "Testupdate",
  },
  photos: "photourlupdate",
  types: ["art", "museum"],
};
let placeId;

before(() => {
  connectDB(false);
});

describe("Server Test Place", () => {
  describe("GET: /", () => {
    it("should return an array of place objects", (done) => {
      request(app)
        .get(URL_BASE)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty("places");
        })
        .end(done);
    });
  });
  describe("POST: /new", () => {
    it("should create and return an place document", (done) => {
      request(app)
        .post("/api/v1/place/new")
        .send(TEST_OBJECT)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty("place");
          expect(res.body.place).toHaveProperty("_id");
          placeId = res.body.place._id;
        })
        .end(done);
    });
  });
  describe("GET: /:id", () => {
    it("should return an place document", (done) => {
      request(app)
        .get("/api/v1/place/" + placeId)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty("place");
          expect(res.body.place.place_id).toBe(TEST_OBJECT.place_id);
          expect(res.body.place.name).toBe(TEST_OBJECT.name);
          expect(res.body.place.events).toStrictEqual(TEST_OBJECT.events);
          expect(res.body.place.location).toStrictEqual(TEST_OBJECT.location);
          expect(res.body.place.address).toBe(TEST_OBJECT.address);
          expect(res.body.place.photos).toBe(TEST_OBJECT.photos);
          expect(res.body.place.types).toStrictEqual(TEST_OBJECT.types);
        })
        .end(done);
    });
  });
  describe("PUT: /:id", () => {
    it("should update and return the updated place document", (done) => {
      request(app)
        .put("/api/v1/place/" + placeId)
        .send(TEST_UPDATE)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty("place");
          expect(res.body.place.place_id).toBe(TEST_UPDATE.place_id);
          expect(res.body.place.name).toBe(TEST_UPDATE.name);
          expect(res.body.place.events).toStrictEqual(TEST_UPDATE.events);
          expect(res.body.place.location).toStrictEqual(TEST_UPDATE.location);
          expect(res.body.place.address).toBe(TEST_UPDATE.address);
          expect(res.body.place.photos).toBe(TEST_UPDATE.photos);
          expect(res.body.place.types).toStrictEqual(TEST_UPDATE.types);
        })
        .end(done);
    });
  });
  describe("DELETE: /:id", () => {
    it("should delete and return the deleted place document", (done) => {
      request(app)
        .delete("/api/v1/place/" + placeId)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty("place");
        })
        .end(done);
    });
  });
});

after(() => {
  closeDB();
});
