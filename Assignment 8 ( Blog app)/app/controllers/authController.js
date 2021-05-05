const User = require("../models/auth/User");
const passport = require("passport");

const login = (req, res) => {
  res.render("auth/login");
};

const postLogin = passport.authenticate("local", {
  successRedirect: "/",
  successMessage: "Welcome",
  failureRedirect: "/login",
  failureFlash: true,
});

const register = (req, res) => {
  res.render("auth/register");
};

const postRegister = async (req, res) => {
  try {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
    });
    const newUser = await User.register(user, req.body.password);
    req.flash("success", "Registered successfully, Login to continue !");
    res.redirect("/");
  } catch (e) {
    console.log(e);
    req.flash("error", "Something went wrong !");
    res.redirect("/register");
  }
};

const logout = (req, res) => {
  req.logout();
  req.flash("success", "Logged out successfully");
  res.redirect("/login");
};

module.exports = { login, register, postLogin, postRegister, logout };
