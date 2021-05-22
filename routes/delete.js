const express = require("express");
const mongoose = require("mongoose");
const { param } = require("express-validator");
const validateRequest = require("../middlewares/validate-request");
const Todo = require("../models/Todos");

const router = express.Router();

router.delete(
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
    await Todo.findByIdAndRemove(todo.id);
    res.status(200).send({ message: "Todo Deleted" });
  }
);

module.exports = router;
