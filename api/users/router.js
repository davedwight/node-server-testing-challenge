const express = require("express");
const User = require("./model");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const users = await User.fetch();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newUser = await User.add(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
});

router.delete("/:user_id", async (req, res, next) => {
  try {
    const deletedUser = await User.remove(req.params.user_id);
    res.status(200).json(deletedUser);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
