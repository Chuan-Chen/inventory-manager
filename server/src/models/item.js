const {Schema, model: Model} = require('mongoose');
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const itemSchema = new Schema(
    {   
        ItemID: {
            type: Number,
            unique: true,
            require: true,
        },
        Username: {
            type: String, 
            required: true,
        },
        ItemName: {
            type: String,
        },
        ItemImage: {
            url: {
                type: String,
            }
        },
        ItemBarcode: {
            type: String,
        },
        ItemCategory: [
            
        ]
    }
)
itemSchema.plugin(AutoIncrement, {inc_field: 'ItemID'});
const Item = new Model("Item", itemSchema);



module.exports = Item;