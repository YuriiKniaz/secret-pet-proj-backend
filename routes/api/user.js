const express = require("express");
const ctrl = require("../../controllers/userController");
const router = express.Router();

const validBody = require("../../middlewares/validBody");
const authenticate = require("../../middlewares/authenticate");

const { schemas } = require("../../models/userModel");

router.post("/register", validBody(schemas.registerSchema), ctrl.register);

router.post("/login", validBody(schemas.loginSchema), ctrl.logIn);

router.get("/current", authenticate, ctrl.currentUserData);

router.post("/logout", authenticate, ctrl.logOut);
module.exports = router;
