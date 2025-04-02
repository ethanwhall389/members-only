const { body, validationResult } = require("express-validator");
const queries = require("../models/queries");

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 10 characters.";

const commonPasswords = [
  "password",
  "pass",
  "123456",
  "qwerty",
  "letmein",
  "abc123",
];

const validateUser = [
  body("firstName")
    .trim()
    .isAlpha()
    .withMessage(`First name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`First name ${lengthErr}`),

  body("lastName")
    .trim()
    .isAlpha()
    .withMessage(`Last name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`Last name ${lengthErr}`),

  body("username").trim().isEmail().withMessage(`Must be a valid email`),

  body("password")
    .trim()
    .isLength({ min: 8, max: 25 })
    .withMessage(`Password must be between 8 and 26 characters.`)
    .matches(/[A-Z]/)
    .withMessage(`Password must contain at least one uppercase letter.`)
    .matches(/[a-z]/)
    .withMessage(`Password must contain at least one lowercase letter.`)
    .matches(/[@$!%*?&^]/)
    .withMessage(`Password must contain at least one special character.`)
    .not()
    .matches(/\s/)
    .withMessage(`Password must not contain spaces.`)
    .custom((value) => {
      if (commonPasswords.includes(value.toLowerCase())) {
        throw new Error(
          "This password is too common. Please choose a stronger password."
        );
      }
      return true;
    }),

  body("confirm-password")
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
];

const signUpPageGet = async (req, res) => {
  res.render("./pages/signUp");
};

const signUpPost = [
  validateUser,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .status(400)
        .render("./pages/signUp", { errors: errors.array() });
    }

    const { firstName, lastName, username, password, isAdmin } = req.body;
    const { exists } = await queries.userExistsUsername(username);
    if (exists) {
      return res.render("./pages/signUp", {
        errors: [{ msg: "A user with that email already exists." }],
      });
    } else {
      await queries.createUser(
        firstName,
        lastName,
        username,
        password,
        isAdmin
      );
      res.redirect("/");
    }
  },
];

module.exports = {
  signUpPageGet,
  signUpPost,
};
