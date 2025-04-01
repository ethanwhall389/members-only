const joinClubPageGet = async (req, res) => {
  //   res.render("Home page");
  res.send("join club");
};

const joinClubPost = async (req, res) => {
  res.status(200);
  res.redirect("/");
};

module.exports = {
  joinClubPageGet,
  joinClubPost,
};
