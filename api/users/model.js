const db = require("../../data/db-config");

function fetch() {
  return db("users");
}

async function add(user) {
  const [user_id] = await db("users").insert(user);
  const newUser = db("users").where("user_id", user_id).first();
  console.log(newUser);
  return newUser;
}

async function remove(user_id) {
  const userToBeRemoved = await db('users').where('user_id', user_id).first();
  await db('users').where('user_id', user_id).del();
  return userToBeRemoved;
}

module.exports = {
  fetch,
  add,
  remove,
};
