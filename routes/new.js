const express = require("express");
const { body } = require("express-validator");
const validateRequest = require("../middlewares/validate-request");
const Todo = require("../models/Todos");
const TODO_STATUSES = require("../shared/enums");

const router = express.Router();

router.post(
  "/api/todos",
  [
    body("title")
      .trim()
      .notEmpty({ ignore_whitespace: true })
      .withMessage("You must provide a title")
      .isLength({ min: 3 }),
  ],
  validateRequest,
  async (req, res) => {
    const { title, status } = req.body;
    const todo = new Todo({
      title,
      status: status || TODO_STATUSES.NOT_COMPLETED,
    });
    await todo.save();
    res.status(201).send(todo);
  }
);

module.exports = router;
