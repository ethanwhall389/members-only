const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const queries = require("../models/queries");
const bcrypt = require("bcryptjs");

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/unauthorized");
  }
}

async function ensureMessageAuthor(req, res, next) {
  const messageId = req.params.messageId;
  if (req.isAuthenticated()) {
    const user = await req.user;
    const messageAuthorId = await queries.getMessageAuthorId(messageId);
    if (user.id === messageAuthorId) return next();
  }
  res.redirect("/unauthorized");
}

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await queries.getUserByUsername(username);
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = queries.getUserById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = {
  passport,
  ensureAuthenticated,
  ensureMessageAuthor,
};
