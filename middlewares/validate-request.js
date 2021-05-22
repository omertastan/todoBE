const { validationResult } = require("express-validator");

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((err) => ({
      message: err.msg,
      field: err.param,
    }));
    return res.status(400).send({ errors: errorMessages });
  }

  next();
};

module.exports = validateRequest;
