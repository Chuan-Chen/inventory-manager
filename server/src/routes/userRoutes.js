const Router = require('express').Router();

const userController = require("../controllers/userController.js");

Router.post("/create", userController.createUser);
Router.post("/read", userController.readUser);
Router.get("/delete", userController.deleteUser);
Router.get("/update", userController.updateUser);


module.exports = Router;