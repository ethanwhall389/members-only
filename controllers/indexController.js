const queries = require("../models/queries");

const indexPageGet = async (req, res) => {
  const messages = await queries.getAllMessages();
  const user = await req.user;
  console.log(user);
  res.render("./pages/index", { messages: messages, user: user });
};

module.exports = {
  indexPageGet,
};
