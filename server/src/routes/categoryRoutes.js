const Router = require('express').Router();
const categoryController = require('../controllers/categoryController.js');


Router.post("/create", categoryController.createCategory);
Router.post("/read", categoryController.readCategory);
Router.get("/update", categoryController.updateCategory);
Router.get("/delete", categoryController.deleteCategory);

module.exports = Router;