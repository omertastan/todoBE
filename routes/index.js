const express = require("express");
const Todo = require("../models/Todos");

const router = express.Router();

router.get("/api/todos", async (req, res) => {
  const todos = await Todo.find({});

  res.send(todos);
});

module.exports = router;
