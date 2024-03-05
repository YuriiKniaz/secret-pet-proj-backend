const { model, Schema } = require("mongoose");
const Joi = require("joi");

const handleMongooseError = require("../helpers/handleMongooseError");

//Mongoose schema

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  verificationToken: {
    type: String,
    required: [true, "Verify token is required"],
  },
  token: {
    type: String,
  },
});

userSchema.post("save", handleMongooseError);

//Joi validation schema

const registerSchema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required().min(8),
  name: Joi.string().required().min(8).max(64),
});

const emailSchema = Joi.object({
  email: Joi.string().required().email(),
});

const loginSchema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required().min(8),
});

const schemas = {
  registerSchema,
  loginSchema,
  emailSchema,
};

const User = model("user", userSchema);

module.exports = { User, schemas };
