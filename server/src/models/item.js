const {Schema, model: Model} = require('mongoose');
const mongoose = require('mongoose');
const {userSchema} = require("./user.js");
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
            type: String,
        },
        ItemBarcode: {
            type: String,
        },
        ItemCategory: [
            
        ],
        ItemAmount: {
            type: Number
        },
        ItemDescription: {
            type: String
        },
        Views: {
            type: Number
        },
        Cost: {
            type: Number
        }
    },
    { timestamps: true }
)

itemSchema.plugin(AutoIncrement, {id: "Items", inc_field: 'ItemID'});

const Item = new Model("Item", itemSchema);



module.exports = {Item, itemSchema};