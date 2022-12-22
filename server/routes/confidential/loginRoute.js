const loginController = require("../../controller/loginController");
const express = require("express");
const router = express.Router();
const { verifyJwt } = require("../../middleware/verifyJwt");
router.post("/login", loginController.login);
router.get("/refresh", verifyJwt, loginController.loginRefresh);
router.post("/logout", loginController.logout);

module.exports = router;
