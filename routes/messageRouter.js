const { Router } = require("express");
const messageController = require("../controllers/messageController");
const auth = require("../config/auth");

const messageRouter = Router();

messageRouter.get("/new", messageController.messagePageGet);
messageRouter.post("/new", messageController.messagePost);
messageRouter.get(
  "/:messageId/edit",
  auth.ensureMessageAuthor,
  messageController.messageEditPageGet
);
messageRouter.post(
  "/:messageId/edit",
  auth.ensureMessageAuthor,
  messageController.messageEditPost
);
messageRouter.post("/:messageId/delete", messageController.messageDeletePost);

module.exports = messageRouter;
