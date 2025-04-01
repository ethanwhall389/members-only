const { Router } = require("express");
const joinClubController = require("../controllers/joinClubController");

const joinClubRouter = Router();

joinClubRouter.get("/", joinClubController.joinClubPageGet);
joinClubRouter.post("/", joinClubController.joinClubPost);

module.exports = joinClubRouter;
