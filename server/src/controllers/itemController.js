const Item = require('../models/item')


const createItem = async(req, res) => {
    try{
        const item = new Item({
            User: req.body.User,
            ItemName: req.body.ItemName, 
            ItemImage: req.body.ItemImage,
            ItemBarcode: req.body.ItemBarcode,
            ItemCateory: req.body.ItemCateory
        })
        item.save();
        res.status(200).json({item});

    }catch(err){
        res.status(400).json({item:null});
    }
}

const readItem = async(req, res) => {

}

const updateItem = async(req, res) => {

}

const deleteItem = async(req, res) => {

}

module.exports = {
    createItem,
    readItem,
    updateItem,
    deleteItem
}