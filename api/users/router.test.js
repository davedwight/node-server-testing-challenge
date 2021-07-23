const db = require("../../data/db-config");

test("is the correct environment", () => {
  expect(process.env.DB_ENV).toBe("testing");
});
