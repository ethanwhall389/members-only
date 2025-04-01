const { Router } = require("express");
const signUpController = require("../controllers/signUpController");

const signUpRouter = Router();

signUpRouter.get("/", signUpController.signUpPageGet);
signUpRouter.post("/", signUpController.signUpPost);

module.exports = signUpRouter;
