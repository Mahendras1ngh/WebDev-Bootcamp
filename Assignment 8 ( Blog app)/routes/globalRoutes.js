const express = require("express");
const isLogged = require("../app/middlewares/isLogged");
const router = express.Router();
const {
  home,
  blogController,
  newBlog,
  addBlog,
  editPage,
  editBlog,
  deleteBlog,
  addComment,
} = require("../app/controllers/homeController");

router.get("/", home);

router.get("/new", isLogged, newBlog);
router.post("/new", isLogged, addBlog);

router.get("/:id", blogController);
router.get("/:id/edit", isLogged, editPage);
router.patch("/:id", isLogged, editBlog);
router.delete("/:id", isLogged, deleteBlog);

router.post("/:id/comment", addComment);

module.exports = router;
