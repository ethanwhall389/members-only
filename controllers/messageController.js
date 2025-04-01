const messagePageGet = async (req, res) => {
  //   res.render("Home page");
  res.send("message");
};

const messagePost = async (req, res) => {};

const messageEditPageGet = async (req, res) => {
  const id = req.params.messageId;
  res.send(`edit message: ${id}`);
};

const messageEditPost = async (req, res) => {};

const messageDeletePost = async (req, res) => {};

module.exports = {
  messagePageGet,
  messagePost,
  messageEditPageGet,
  messageEditPost,
  messageDeletePost,
};
