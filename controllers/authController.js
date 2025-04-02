const { body, validationResult } = require("express-validator");
const { passport } = require("../config/auth");

const validateUser = [
  body("username").trim().isEmail().withMessage(`Must be a valid email`),
  body("password")
    .trim()
    .isLength({ min: 8, max: 25 })
    .withMessage(`Password must be between 8 and 26 characters.`)
    .matches(/[@$!%*?&^]/)
    .withMessage(`Password must contain at least one special character.`)
    .not()
    .matches(/\s/)
    .withMessage(`Password must not contain spaces.`),
];

const logInPageGet = async (req, res) => {
  const errors = req.flash("error");
  res.render("./pages/logIn", { errors: errors });
};

const logInPost = [
  //validateUser,
  (req, res, next) => {
    console.log("log-in attempt");
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/log/in",
      failureFlash: true,
    })(req, res, next);
  },
];

const logOutGet = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

module.exports = {
  logInPageGet,
  logInPost,
  logOutGet,
};
