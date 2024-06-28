const Router = require('express').Router();

const userController = require("../controllers/userController.js");
const { generateToken, authenticateToken } = require('../middleware/authentication.js');

Router.post("/create" , generateToken , userController.createUser);
Router.post("/read" , authenticateToken, userController.readUser);
Router.get("/delete" , authenticateToken, userController.deleteUser);
Router.get("/update" , authenticateToken, userController.updateUser);


module.exports = Router;