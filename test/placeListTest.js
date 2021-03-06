const expect = require("expect");
const request = require("supertest");
const app = require("../app");
const connectDB = require("../data/connectDB");
const closeDB = require("../data/closeDB");
const URL_BASE = "/api/v1/placeList/";
const server = request.agent(app);

const TEST_USER = {
  username: "test",
  first_name: "testF",
  last_name: "testL",
  email: "test@test",
  password: "test",
};

const TEST_OBJECT = {
  user_id: "dummy_user_id",
  name: "dummy_name",
  places: ["dummy_places"],
  date: "2021-01-01",
};

const TEST_UPDATE = {
  user_id: "dummy_user_id_update",
  name: "dummy_name_update",
  places: ["dummy_places", "dummy_places_update"],
  date: "2021-01-05",
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

describe("Server Test PlaceList", () => {
  describe("GET: /", () => {
    it("login", loginUser()); //login before invoking the api
    it("should return an array of placeList objects", (done) => {
      server
        .get(URL_BASE)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty("lists");
        })
        .end(done);
    });
  });
  describe("POST: /new", () => {
    it("login", loginUser()); //login before invoking the api
    it("should create and return an placelist document", (done) => {
      server
        .post(URL_BASE + "new")
        .send(TEST_OBJECT)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty("list");
          expect(res.body.list).toHaveProperty("_id");
          eventId = res.body.list._id;
        })
        .end(done);
    });
  });
  describe("GET: /:id", () => {
    it("login", loginUser()); //login before invoking the api
    it("should return an placelist document", (done) => {
      server
        .get(URL_BASE + eventId)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty("list");
          expect(res.body.list.user_id).toBe(TEST_OBJECT.user_id);
          expect(res.body.list.events).toStrictEqual(TEST_OBJECT.events);
          //expect(res.body.list.date).toBe(TEST_OBJECT.date);
        })
        .end(done);
    });
  });
  describe("PUT: /:id", () => {
    it("login", loginUser()); //login before invoking the api
    it("should update and return the updated placelist document", (done) => {
      server
        .put(URL_BASE + eventId)
        .send(TEST_UPDATE)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty("list");
          expect(res.body.list.user_id).toBe(TEST_UPDATE.user_id);
          expect(res.body.list.places).toStrictEqual(TEST_UPDATE.places);
          //expect(res.body.list.date).toBe(TEST_UPDATE.date);
        })
        .end(done);
    });
  });
  describe("DELETE: /:id", () => {
    it("login", loginUser()); //login before invoking the api
    it("should delete and return the deleted placelist document", (done) => {
      server
        .delete(URL_BASE + eventId)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty("list");
        })
        .end(done);
    });
  });
});

after(() => {
  closeDB();
});
