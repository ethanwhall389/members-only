const queries = require("../models/queries");

const indexPageGet = async (req, res) => {
  const messages = await queries.getAllMessages();
  res.render("./pages/index", { messages: messages });
};

module.exports = {
  indexPageGet,
};
