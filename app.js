const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.use(express.urlencoded({ extended: true }));

// app.use("/", indexRouter);
app.get("/", (req, res) => res.send("home"));
//other routes
app.use((req, res) => res.status(404).render("pages/404"));

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
