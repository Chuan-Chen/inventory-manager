const express = require("express");
const Router = require('express').Router();
const upload = require("../middleware/upload.js");
const imageController = require("../controllers/imageController.js");

//Crud
Router.post("/upload", upload.single('image'), imageController.upload);
//read items without auth


//Router.get("/file:filename" , express.static("/images"));
//cRud
//Router.post("/read", imageController.readItem);

//cruD
//Router.get("/delete", imageController.deleteItem);



module.exports = Router;