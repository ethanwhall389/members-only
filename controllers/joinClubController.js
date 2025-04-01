const joinClubPageGet = async (req, res) => {
  res.render("./pages/joinClub");
};

const joinClubPost = async (req, res) => {
  res.status(200);
  res.redirect("/");
};

module.exports = {
  joinClubPageGet,
  joinClubPost,
};
