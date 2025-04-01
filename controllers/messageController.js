const queries = require("../models/queries");

const messagePageGet = async (req, res) => {
  res.render("./pages/messageNew");
};

const messagePost = async (req, res) => {
  res.redirect("/");
};

const messageEditPageGet = async (req, res) => {
  const id = req.params.messageId;
  const message = await queries.getMessageById(id);
  res.render("./pages/messageEdit", { message: message });
};

const messageEditPost = async (req, res) => {
  res.render("./pages/messageEdit");
};

const messageDeletePost = async (req, res) => {};

module.exports = {
  messagePageGet,
  messagePost,
  messageEditPageGet,
  messageEditPost,
  messageDeletePost,
};
