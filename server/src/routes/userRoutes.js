const Router = require('express').Router();

const userController = require("../controllers/userController.js");
const { generateToken } = require('../middleware/authentication.js');

Router.post("/create" , generateToken , userController.createUser);
Router.post("/read", userController.readUser);
Router.get("/delete", userController.deleteUser);
Router.get("/update", userController.updateUser);


module.exports = Router;