const HttpError = require("../helpers/HttpError");
const ctrlWrapper = require("../helpers/ctrlWrapper");
const { schemas, Content } = require("../models/contentDataModel");

const getTextContent = async (req, res) => {
  const { _id: owner } = req.user;
  const response = await Content.find({ owner });
  console.log(owner);
  res.status(200).json(response);
};

const createTextContent = async (req, res) => {
  const { _id: owner } = req.user;
  const validateText = schemas.textContentSchema.validate(req.body);
  if (validateText.error) {
    throw HttpError(400, "Missing required fields");
  }
  const response = await Content.create({
    ...req.body,
    owner,
  });
  res.status(200).json(response);
};

const deleteTextContent = async (req, res) => {
  const { contentId } = req.params;

  const response = await Content.findByIdAndDelete(contentId);

  if (!response) {
    throw HttpError(404, "Incorrect id");
  }

  res.status(200).json({ message: "Content succesfuly deleted" });
};

module.exports = {
  getTextContent: ctrlWrapper(getTextContent),
  createTextContent: ctrlWrapper(createTextContent),
  deleteTextContent: ctrlWrapper(deleteTextContent),
};
