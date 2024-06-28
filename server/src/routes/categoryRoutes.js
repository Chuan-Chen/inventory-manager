const Router = require('express').Router();
const categoryController = require('../controllers/categoryController.js');
const { authenticateToken } = require('../middleware/authentication.js');


Router.post("/create", authenticateToken ,categoryController.createCategory);
Router.get("/update", authenticateToken , categoryController.updateCategory);
Router.get("/delete", authenticateToken, categoryController.deleteCategory);

Router.post("/read", categoryController.readCategory);

module.exports = Router;