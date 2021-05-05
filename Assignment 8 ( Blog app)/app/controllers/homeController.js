const Blog = require("../models/Blog");
const Comment = require("../models/Comment");

const home = async (req, res) => {
  const blogs = await Blog.find();
  res.render("blogs", { blogs });
};

const blogController = async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("comments");
  res.render("blog", { blog });
};

const newBlog = (req, res) => {
  res.render("new");
};

const addBlog = async (req, res) => {
  try {
    await Blog.create(req.body);
    req.flash("success", "New blog added !");
    res.redirect("/");
  } catch {
    req.flash("error", "Something went wrong !");
    res.redirect("new");
  }
};

const editPage = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  res.render("edit", { blog });
};

const editBlog = async (req, res) => {
  try {
    await Blog.findByIdAndUpdate(req.params.id, req.body);
    req.flash("success", "Updated successfully !");
    res.redirect(`/${req.params.id}`);
  } catch (e) {
    req.flash("error", "Something went wrong");
    res.redirect("/" + req.params.id);
  }
};

const deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    req.flash("Blog deleted !");
    res.redirect("/");
  } catch {
    req.flash("error", "Something went wrong");
    res.redirect("/");
  }
};

const addComment = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    const comment = new Comment({
      user: req.user.username,
      body: req.body.commentBody,
    });
    console.log("comment:", comment);
    blog.comments.push(comment);
    await comment.save();
    await blog.save();

    req.flash("success", "Comment added !");
    res.redirect("/" + req.params.id);
  } catch {
    req.flash("error", "Couldnt proceed your request !");
    res.redirect("/" + req.params.id);
  }
};

module.exports = {
  home,
  blogController,
  newBlog,
  addBlog,
  editPage,
  editBlog,
  deleteBlog,
  addComment,
};
