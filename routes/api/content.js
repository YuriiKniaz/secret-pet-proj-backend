const express = require("express");
const ctrl = require("../../controllers/textContentController");
const router = express.Router();

const validBody = require("../../middlewares/validBody");
const authenticate = require("../../middlewares/authenticate");

const { schemas } = require("../../models/contentDataModel");

//Text content

router
  .get("/get/textContent", authenticate, ctrl.getTextContent)
  .post(
    "/create/textContent",
    authenticate,
    validBody(schemas.textContentSchema),
    ctrl.createTextContent
  )
  .delete("/delete/:contentId", authenticate, ctrl.deleteTextContent);

module.exports = router;
