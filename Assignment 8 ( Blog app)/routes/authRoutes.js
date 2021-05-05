const express = require("express");

const router = express.Router();
const {
  login,
  register,
  postLogin,
  postRegister,
  logout,
} = require("../app/controllers/authController");

router.get("/login", login);
router.post("/login", postLogin);

router.get("/register", register);
router.post("/register", postRegister);

router.get("/logout", logout);

module.exports = router;
