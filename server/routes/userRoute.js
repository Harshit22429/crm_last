const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const { verifyRoles } = require("../middleware/verifyRoles");
const Role_List = require("../config/Role_List");
const { verifyJwt } = require("../middleware/verifyJwt");
const bcrypt = require("bcrypt");

// console.log(Role_List.Admin)
// router.use(verifyJwt)
// router.use(verifyRoles(Role_List.Admin))
router.post(
  "/admin/pass",
  // verifyJwt,
  // verifyRoles(Role_List.Admin),
  async (req, res) => {
    const { password } = req.body;
    console.log(password);
    const hashedPwd = await bcrypt.hash(password, 10);
    res.send(hashedPwd);
  }
);
router.post(
  "/admin/create",
  // verifyJwt,
  // verifyRoles(Role_List.Admin),
  userController.createNewUser
);
router.get(
  "/admin/:parentId",
  // verifyJwt,
  // verifyRoles(Role_List.Admin),
  userController.getAllUser
);
router.get(
  "/admin/getAllAgentName/:parentId"
  // verifyJwt,
  // userController.getAllUserName
);
router.get("/admin/:userId", verifyJwt, userController.getAllUser);
router.put("/admin/:userId", verifyJwt, userController.updateUser);
router.delete("/admin/:userId", verifyJwt, userController.deleteUser);

module.exports = router;
