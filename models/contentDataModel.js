const { model, Schema } = require("mongoose");
const Joi = require("joi");

const handleMongooseError = require("../helpers/handleMongooseError");

const categorieList = ["article", "poem", "song", "post"];

const contentSchema = new Schema({
  categorie: {
    type: String,
    required: [true, "Categorie is required"],
  },
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  description: {
    type: String,
  },
  textContent: {
    type: String,
    required: [true, "Text is required"],
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

contentSchema.post("save", handleMongooseError);

//Joi validation schema

const textContentSchema = Joi.object({
  categorie: Joi.string().valid(...categorieList),
  title: Joi.string().min(3),
  description: Joi.string(),
  textContent: Joi.string().min(8),
});

const schemas = {
  textContentSchema,
};

const Content = model("content", contentSchema);

module.exports = { Content, schemas };
