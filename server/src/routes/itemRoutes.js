const Router = require('express').Router();

const itemController = require("../controllers/itemController.js");

Router.post("/create", itemController.createItem);
Router.get("/update", itemController.updateItem);

//read items without auth
Router.get("/read", itemController.readItem);
Router.get("/delete", itemController.deleteItem);


module.exports = Router;