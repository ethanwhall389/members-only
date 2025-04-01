const express = require("express");
const path = require("path");

const indexRouter = require("./routes/indexRouter");
const signUpRouter = require("./routes/signUpRouter");
const logInRouter = require("./routes/logInRouter");
const joinClubRouter = require("./routes/joinClubRouter");
const messageRouter = require("./routes/messageRouter");

const app = express();
const PORT = process.env.PORT || 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/sign-up", signUpRouter);
app.use("/log-in", logInRouter);
app.use("/join-club", joinClubRouter);
app.use("/message", messageRouter);
//404 route
app.use((req, res) => res.status(404).render("pages/404"));

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
