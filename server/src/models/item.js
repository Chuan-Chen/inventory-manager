const {Schema, model: Model} = require('mongoose');

const itemSchema = new Schema(
    {
        User: {
            type: String, 
            required: true,
        },
        ItemName: {
            type: String,
            required: true,
            unique: false,
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

const Item = new Model("Item", itemSchema);


module.exports = Item;