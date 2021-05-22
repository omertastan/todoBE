const express = require("express");
const mongoose = require("mongoose");
const { param } = require("express-validator");
const validateRequest = require("../middlewares/validate-request");
const Todo = require("../models/Todos");

const router = express.Router();

router.get(
  "/api/todos/:id",
  [param("id").custom((input) => mongoose.Types.ObjectId.isValid(input))],
  validateRequest,
  async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res
        .status(404)
        .send({ errors: [{ message: "We couldn't find such a task" }] });
    }
    res.send(todo);
  }
);

module.exports = router;
