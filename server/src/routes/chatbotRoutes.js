const Router = require('express').Router();

const chatbotController = require("../controllers/chatbotController.js");
const { authenticateToken } = require('../middleware/authentication.js');
//authenticateToken
Router.post("/chat", chatbotController.AIChat);




module.exports = Router;