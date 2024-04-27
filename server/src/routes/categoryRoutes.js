const Router = require('express').Router();
const categoryController = require("../controllers/categoryController.js");


Router.get("/create", categoryController.createCategory);
Router.get("/read", categoryController.readCategory);
Router.get("/update", categoryController.updateCategory);
Router.get("/delete", categoryController.deleteCategory);

module.exports = Router;