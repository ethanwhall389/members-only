const { Router } = require("express");
const logInController = require("../controllers/logInController");

const logInRouter = Router();

logInRouter.get("/", logInController.logInPageGet);
logInRouter.post("/", logInController.logInPost);

module.exports = logInRouter;
