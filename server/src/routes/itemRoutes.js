const Router = require('express').Router();

const itemController = require("../controllers/itemController.js");
const { authenticateToken } = require('../middleware/authentication.js');

Router.post("/create", authenticateToken , itemController.createItem);
Router.get("/update", authenticateToken, itemController.updateItem);

//read items without auth
Router.post("/read", itemController.readItem);
Router.get("/read", itemController.readAllItems);
Router.get("/delete", itemController.deleteItem);

Router.get("/stream", itemController.readStream);

module.exports = Router;