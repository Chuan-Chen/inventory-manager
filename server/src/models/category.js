const {Schema, model: Model} = require('mongoose');
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const categorySchema = new Schema({
    CategoryID: {
        type: Number,
        unique: true
    },
    Username: {
        type: String,
        unique: false
    },
    CategoryName: {
        type: String,
        required: true
    },
    CategoryDescription: {
        type: String,
        required: true
    },
    CategoryImage: {
        url: {
            type: String
        }
    }
})
categorySchema.plugin(AutoIncrement, {inc_field: 'CategoryID'});
const Category = new Model("Category", categorySchema);


module.exports = {Category, categorySchema};