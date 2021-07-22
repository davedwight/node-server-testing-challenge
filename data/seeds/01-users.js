exports.seed = function (knex) {
  return knex("users").insert([
    { username: "foo" },
    { username: "bar" },
    { username: "baz" },
  ]);
};
