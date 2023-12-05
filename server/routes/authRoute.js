const express = require("express");
const authCtrl = require("../controller/authCtrl");
const authM = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/signup", authCtrl.signUp);
router.post("/logout", authM.authMiddleware, authCtrl.logout);
router.post("/login", authCtrl.login);
router.put(
  "/block-user",
  authM.authMiddleware,
  authM.isAdmin,
  authCtrl.blockUser
);

module.exports = router;