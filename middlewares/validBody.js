const HttpError = require("../helpers/HttpError");

const validBody = (schema) => {
  const validator = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };

  return validator;
};

module.exports = validBody;
