const logInPageGet = async (req, res) => {
  //   res.render("Home page");
  res.send("log in");
};

const logInPost = async (req, res) => {
  res.status(200);
  res.redirect("/");
};

module.exports = {
  logInPageGet,
  logInPost,
};
