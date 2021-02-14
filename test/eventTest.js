const expect = require("expect");
const request = require("supertest");
const app = require("../app");
const connectDB = require("../data/connectDB");
const closeDB = require("../data/closeDB");
const URL_BASE = "/api/v1/event/";
const server = request.agent(app);

const TEST_USER = {
  username: "test",
  first_name: "testF",
  last_name: "testL",
  email: "test@test",
  password: "test",
};

const TEST_OBJECT = {
  list_id: "Dummy_list_id",
  place_id: "Dummy_place_id",
  name: "Test Place Name",
  description: "dummy description",
  dateStart: "2021-01-01",
  dateEnd: "2021-12-01",
  photos: ["photo"],
};

const TEST_UPDATE = {
  list_id: "Dummy_list_id_up",
  place_id: "Dummy_place_id_up",
  name: "Test Place Name_up",
  description: "dummy description_up",
  dateStart: "2021-01-15",
  dateEnd: "2021-12-15",
  photos: ["photo", "photo2"],
};

const loginUser = () => {
  return (done) => {
    const onResponse = (err, res) => {
      if (err) return done(err);
      return done();
    };

    server
      .post("/api/v1/auth/login")
      .send({ username: "test", password: "test" })
      .expect((res) => {
        expect(res.body).toHaveProperty("user");
      })
      .end(onResponse);
  };
};

let eventId;

before(() => {
  connectDB(false);
});

describe("Server Test Event", () => {
  describe("GET: /", () => {
    it("should return an array of event objects", (done) => {
      request(app)
        .get(URL_BASE)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty("events");
        })
        .end(done);
    });
  });
  describe("POST: /new", () => {
    it("login", loginUser()); //login before invoking the api
    it("should create and return an place document", (done) => {
      server
        .post("/api/v1/event/new")

        .send(TEST_OBJECT)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty("event");
          expect(res.body.event).toHaveProperty("_id");
          eventId = res.body.event._id;
        })
        .end(done);
    });
  });
  describe("GET: /:id", () => {
    it("login", loginUser()); //login before invoking the api
    it("should return an event document", (done) => {
      server
        .get("/api/v1/event/" + eventId)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty("event");
          expect(res.body.event.list_id).toBe(TEST_OBJECT.list_id);
          expect(res.body.event.place_id).toBe(TEST_OBJECT.place_id);
          expect(res.body.event.name).toBe(TEST_OBJECT.name);
          expect(res.body.event.description).toBe(TEST_OBJECT.description);
          //   expect(res.body.event.dateStart).toBe(TEST_OBJECT.dateStart);
          //   expect(res.body.event.dateEnd).toBe(TEST_OBJECT.dateEnd);
          expect(res.body.event.photos).toStrictEqual(TEST_OBJECT.photos);
        })
        .end(done);
    });
  });
  describe("PUT: /:id", () => {
    it("login", loginUser()); //login before invoking the api
    it("should update and return the updated place document", (done) => {
      server
        .put("/api/v1/event/" + eventId)
        .send(TEST_UPDATE)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty("event");
          expect(res.body.event.list_id).toBe(TEST_UPDATE.list_id);
          expect(res.body.event.place_id).toBe(TEST_UPDATE.place_id);
          expect(res.body.event.name).toBe(TEST_UPDATE.name);
          expect(res.body.event.description).toBe(TEST_UPDATE.description);
          //   expect(res.body.event.dateStart).toBe(TEST_UPDATE.dateStart);
          //   expect(res.body.event.dateEnd).toBe(TEST_UPDATE.dateEnd);
          expect(res.body.event.photos).toStrictEqual(TEST_UPDATE.photos);
        })
        .end(done);
    });
  });

  describe("GET: /", () => {
    it("should return an array of event objects by placeid", (done) => {
      request(app)
        .get(URL_BASE + "place/" + TEST_UPDATE.place_id)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty("events");
        })
        .end(done);
    });
  });

  describe("DELETE: /:id", () => {
    it("login", loginUser()); //login before invoking the api
    it("should delete and return the deleted event document", (done) => {
      server
        .delete("/api/v1/event/" + eventId)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty("event");
        })
        .end(done);
    });
  });
});

after(() => {
  closeDB();
});
