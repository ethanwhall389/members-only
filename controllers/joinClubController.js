const queries = require("../models/queries");

const joinClubPageGet = async (req, res) => {
  res.render("./pages/joinClub");
};

const joinClubPost = async (req, res) => {
  const clubId = 1;
  const password = req.body.password;
  const club = await queries.getClubById(clubId);
  const clubPassword = club.password;

  if (password !== clubPassword) {
    const errors = ["Incorrect password"];
    return res.render("./pages/joinClub", { errors: errors });
  } else {
    const user = await req.user;
    console.log(user.id);
    await queries.updateUserClubStatus(true, user.id);
    res.redirect("/");
  }
};

module.exports = {
  joinClubPageGet,
  joinClubPost,
};
