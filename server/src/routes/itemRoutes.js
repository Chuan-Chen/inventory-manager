const Router = require('express').Router();

const itemController = require("../controllers/itemController.js");

Router.get("/create", itemController.createItem);
Router.get("/update", itemController.updateItem);
Router.get("/read", itemController.readItem);
Router.get("/delete", itemController.deleteItem);


module.exports = Router;