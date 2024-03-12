const {Schema} = require('mongoose');

const itemSchema = new Schema(
    {
        ItemName: {
            type: String,
            required: true,
            unique: true,
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