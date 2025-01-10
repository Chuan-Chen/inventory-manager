const Router = require('express').Router();
const {Item} = require('../models/item')

Router.post("/" , async (res, req) => {
    const search = res.body.searchparameters;
    const ItemResult = await Item.find({}, "Username ItemName ItemImage ItemBarcode ItemCategory createdAt ItemID")
    req.json({"data": [...ItemResult], "msg" : "search successful"})
});


module.exports = Router;