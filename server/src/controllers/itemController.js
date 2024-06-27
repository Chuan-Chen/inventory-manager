const Item = require('../models/item')
const User = require('../models/user')

const createItem = async(req, res) => {
    try{
        const item = new Item({
            Username: req.body.Username,
            ItemName: req.body.ItemName, 
            ItemImage: req.body.ItemImage,
            ItemBarcode: req.body.ItemBarcode,
            ItemCateory: req.body.ItemCateory
        })
        
        const user = await User.findOneAndUpdate({Username: item.Username}, {"$push": { Items: item._id }}, {new: true});
        if(user == null){
            res.status(401).json({item, msg: "User doesn't exist"})
        }else{
            item.save();
            res.status(200).json({item, msg: "Item added successfully"});
        }
    }catch(err){
        res.status(400).json({item:null, msg: "Item added unsuccessfully"});
    }
}

const readItem = async(req, res) => {
    try{
        const filter = {
            Username: req.body.Username,
            ItemName: req.body.ItemName, 
            ItemImage: req.body.ItemImage,
            ItemBarcode: req.body.ItemBarcode,
            ItemCateory: req.body.ItemCateory
        }
        const result = await Item.find({
            "$or" : [
                {Username: filter.Username},
                {ItemName: filter.ItemName},
                {ItemImage: filter.ItemImage}, 
                {ItemBarcode: filter.ItemBarcode}, 
                {ItemCateory: filter.ItemCateory}
            ]
        });
        console.log(result)
        res.status(200).json({result, msg: "Search Successful"});
    }catch(err){
        res.status(400).json({result: filter, msg: "Search Unsuccessful"});
    }
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