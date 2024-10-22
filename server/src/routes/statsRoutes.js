const Router = require('express').Router();

const statsController = require("../controllers/statsController.js")
const { generateToken, authenticateToken } = require('../middleware/authentication.js');

Router.get("/read/:Username" , authenticateToken, statsController.getUserStats);
Router.get("/", statsController.getAllStats);



module.exports = Router;