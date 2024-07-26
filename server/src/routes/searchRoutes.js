const Router = require('express').Router();
const Item = require('../models/item')
const Category = require('../models/category')

Router.post("/" , async (res, req) => {
    const search = res.body.searchparameters;
    const ItemResult = await Item.find({})
    const CategoryResult = await Category.find({});


    
    req.json({"result": {...ItemResult, ...CategoryResult}, "msg" : "search successful"})
});


module.exports = Router;