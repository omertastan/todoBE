const express = require("express");
const { body, param } = require("express-validator");
const mongoose = require("mongoose");
const validateRequest = require("../middlewares/validate-request");
const Todo = require("../models/Todos");

const router = express.Router();

router.put(
  "/api/todos/:id",
  [
    body("title")
      .trim()
      .if(body("title").notEmpty({ ignore_whitespace: true }))
      .isLength({ min: 3 })
      .withMessage("Title must be min. 3 characters"),
    param("id").custom((input) => mongoose.Types.ObjectId.isValid(input)),
  ],
  validateRequest,
  async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res
        .status(404)
        .send({ errors: [{ message: "We couldn't find such a task" }] });
    }

    const { title, status } = req.body;
    todo.set({
      title: title || todo.title,
      status: status || todo.status,
    });
    await todo.save();
    res.send(todo);
  }
);

module.exports = router;
