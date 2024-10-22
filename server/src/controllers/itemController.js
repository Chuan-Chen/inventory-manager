const {Item} = require('../models/item')
const {User} = require('../models/user')



const createItem = async(req, res) => {
    try{
        const item = new Item({
            Username: req.body.Username,
            ItemName: req.body.ItemName, 
            ItemImage: req.body.ItemImage,
            ItemBarcode: req.body.ItemBarcode,
            ItemCateory: req.body.ItemCategory,
            View: 0
        })
        item.ItemCategory.push(...req.body.ItemCategory);
        
        const user = await User.findOneAndUpdate({Username: item.Username}, {"$push": { Items: item._id }}, {new: true});
        await User.findOneAndUpdate({Username: item.Username}, {"$inc": {TotalItemsCreated: 1}})
        console.log(user);
        if(user == null){d
            res.status(401).json({item, msg: "User doesn't exist"})
        }else{
            item.save();TotalItemsCreated
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

        res.status(200).json({result, msg: "Search Successful"});
    }catch(err){
        res.status(400).json({result: filter, msg: "Search Unsuccessful"});
    }
}


const readAllItems = async(req, res) => {
    try{
        const result = await Item.find({});
        res.status(200).json({result, msg: "Search Successful"});
    }catch(err){
        res.status(400).json({result: "", msg: "Search Unsuccessful"});
    }
}




const updateItem = async(req, res) => {

}

const deleteItem = async(req, res) => {

}


const readStream = async(req, res) => {
    res.set({
        "Access-Control-Allow-Origin": "http://localhost:5173",
        "Cache-Control" : "no-cache",
        "Content-Type": "text/event-stream",
        "Connection": "keep-alive"

    });
    //console.log(req.params.Username)

    setInterval(async ()=>{
            const result = await Item.find({Username: `${req.params.Username}`}, "_id Username ItemName ItemBarcode ItemCategory ItemID ItemImage");
            res.write("data: " + `${JSON.stringify(result)}\n\n`);
    }, 100)
    
}


module.exports = {
    createItem,
    readItem,
    updateItem,
    deleteItem,
    readStream,
    readAllItems,
}