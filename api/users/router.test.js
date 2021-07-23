const request = require("supertest");
const server = require("../server");
const db = require("../../data/db-config");

test("is the correct environment", () => {
  expect(process.env.DB_ENV).toBe("testing");
});

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});
beforeEach(async () => {
  await db.seed.run();
});
afterAll(async () => {
  await db.destroy();
});

describe("[GET] /api/users", () => {
  test("gets all users from the users table", async () => {
    const res = await request(server).get("/api/users");
    expect(res.body).toMatchObject([
      { user_id: 1, username: "foo" },
      { user_id: 2, username: "bar" },
      { user_id: 3, username: "baz" },
    ]);
  });
  test("snapshot test", async () => {
    const res = await request(server).get("/api/users");
    expect(res.body).toMatchSnapshot();
  });
});

describe("[POST] /api/users", () => {
  test("responds with status code 201", async () => {
    const res = await request(server)
      .post("/api/users")
      .send({ username: "foobar" });
    expect(res.status).toBe(201);
  });
  test("returns the newly created user", async () => {
    const res = await request(server)
      .post("/api/users")
      .send({ username: "foobar" });
    expect(res.body).toMatchObject({ user_id: 4, username: "foobar" });
  });
  test("snapshot test", async () => {
    const res = await request(server)
      .post("/api/users")
      .send({ username: "foobar" });
    expect(res.body).toMatchSnapshot();
  });
});

describe("[DELETE]", () => {
  test("responds with status code 200", async () => {
    const res = await request(server).delete("/api/users/3");
    expect(res.status).toBe(200);
  });
  test("responds with the deleted user", async () => {
    const res = await request(server).delete("/api/users/3");
    expect(res.body).toMatchObject({
      user_id: 3,
      username: "baz",
    });
  });
  test("snapshot test", async () => {
    const res = await request(server).delete("/api/users/3");
    expect(res.body).toMatchSnapshot();
  });
});
