const queries = require("../models/queries");

const messagePageGet = async (req, res) => {
  res.render("./pages/messageNew");
};

const messagePost = async (req, res) => {
  const { title, body } = req.body;
  await queries.createMessage(title, body);
  res.redirect("/");
};

const messageEditPageGet = async (req, res) => {
  const id = req.params.messageId;
  const message = await queries.getMessageById(id);
  res.render("./pages/messageEdit", { message: message });
};

const messageEditPost = async (req, res) => {
  const id = req.params.messageId;
  const { title, body } = req.body;
  await queries.updateMessageById(title, body, id);
  res.redirect("/");
};

const messageDeletePost = async (req, res) => {
  const id = req.params.messageId;
  await queries.deleteMessageById(id);
  res.redirect("/");
};

module.exports = {
  messagePageGet,
  messagePost,
  messageEditPageGet,
  messageEditPost,
  messageDeletePost,
};
