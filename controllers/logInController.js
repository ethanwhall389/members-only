const logInPageGet = async (req, res) => {
  res.render("./pages/logIn");
};

const logInPost = async (req, res) => {
  res.status(200);
  res.redirect("/");
};

module.exports = {
  logInPageGet,
  logInPost,
};
