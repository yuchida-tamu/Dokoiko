const expect = require("expect");
const request = require("supertest");
const app = require("../app");
const connectDB = require("../data/connectDB");
const closeDB = require("../data/closeDB");
const URL_BASE = "/api/v1/comment/";
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
  target_id: "dummy_target_id",
  content: "dummy_content",
  date: "2021-01-01",
  likes: 0,
};

const TEST_UPDATE = {
  user_id: "dummy_user_id_update",
  target_id: "dummy_target_id_update",
  content: "dummy_content_update",
  date: "2021-01-05",
  likes: 4,
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

describe("Server Test Comment", () => {
  describe("GET: /", () => {
    it("login", loginUser()); //login before invoking the api
    it("should return an array of comment objects", (done) => {
      server
        .get(URL_BASE)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty("comments");
        })
        .end(done);
    });
  });
  describe("POST: /new", () => {
    it("login", loginUser()); //login before invoking the api
    it("should create and return an comment document", (done) => {
      server
        .post(URL_BASE + "new")
        .send(TEST_OBJECT)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty("comment");
          expect(res.body.comment).toHaveProperty("_id");
          eventId = res.body.comment._id;
        })
        .end(done);
    });
  });
  describe("GET: /:id", () => {
    it("login", loginUser()); //login before invoking the api
    it("should return an comment document", (done) => {
      server
        .get(URL_BASE + eventId)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty("comment");
          expect(res.body.comment.user_id).toBe(TEST_OBJECT.user_id);
          expect(res.body.comment.target_id).toBe(TEST_OBJECT.target_id);
          expect(res.body.comment.content).toBe(TEST_OBJECT.content);
          expect(res.body.comment.likes).toBe(TEST_OBJECT.likes);
          //expect(res.body.list.date).toBe(TEST_OBJECT.date);
        })
        .end(done);
    });
  });
  describe("PUT: /:id", () => {
    it("login", loginUser()); //login before invoking the api
    it("should update and return the updated comment document", (done) => {
      server
        .put(URL_BASE + eventId)
        .send(TEST_UPDATE)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty("comment");
          expect(res.body.comment.user_id).toBe(TEST_UPDATE.user_id);
          expect(res.body.comment.target_id).toBe(TEST_UPDATE.target_id);
          expect(res.body.comment.content).toBe(TEST_UPDATE.content);
          expect(res.body.comment.likes).toBe(TEST_UPDATE.likes);
          //expect(res.body.list.date).toBe(TEST_UPDATE.date);
        })
        .end(done);
    });
  });
  describe("DELETE: /:id", () => {
    it("login", loginUser()); //login before invoking the api
    it("should delete and return the deleted comment document", (done) => {
      server
        .delete(URL_BASE + eventId)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty("comment");
        })
        .end(done);
    });
  });
});

after(() => {
  closeDB();
});
