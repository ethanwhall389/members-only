const signUpPageGet = async (req, res) => {
  res.render("./pages/signUp");
};

const signUpPost = async (req, res) => {
  res.status(200);
  res.redirect("/");
};

module.exports = {
  signUpPageGet,
  signUpPost,
};
