const Router = require('express').Router();

const chatbotController = require("../controllers/chatbotController.js");
const { authenticateToken } = require('../middleware/authentication.js');
//authenticateToken
Router.post("/chat", authenticateToken, chatbotController.AIChat);
Router.post("/test", chatbotController.Test)



module.exports = Router;