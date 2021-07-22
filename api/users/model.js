const db = require("../../data/db-config");

function fetch() {
  return db("users");
}

function add() {}

function remove() {}

module.exports = {
  fetch,
  add,
  remove,
};
