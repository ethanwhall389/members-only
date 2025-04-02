const { Router } = require("express");
const authController = require("../controllers/authController");

const authRouter = Router();

authRouter.get("/in", authController.logInPageGet);
authRouter.post("/in", authController.logInPost);

authRouter.get("/out", authController.logOutGet);

module.exports = authRouter;
