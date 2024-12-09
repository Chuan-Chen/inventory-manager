const Router = require('express').Router();

const statsController = require("../controllers/statsController.js")
const { generateToken, authenticateToken } = require('../middleware/authentication.js');

Router.post("/user/" , authenticateToken, statsController.getUserStats);
Router.get("/", statsController.getAllStats);



module.exports = Router;