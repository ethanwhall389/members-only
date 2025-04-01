const signUpPageGet = async (req, res) => {
  //   res.render("Home page");
  res.send("sign up");
};

const signUpPost = async (req, res) => {
  res.status(200);
  res.redirect("/");
};

module.exports = {
  signUpPageGet,
  signUpPost,
};
