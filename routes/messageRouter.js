const { Router } = require("express");
const messageController = require("../controllers/messageController");

const messageRouter = Router();

messageRouter.get("/new", messageController.messagePageGet);
messageRouter.post("/new", messageController.messagePost);
messageRouter.get("/:messageId/edit", messageController.messageEditPageGet);
messageRouter.post("/:messageId/edit", messageController.messageEditPost);
messageRouter.post("/:messageId/delete", messageController.messageDeletePost);

module.exports = messageRouter;
