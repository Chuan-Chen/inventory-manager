const {Schema, model: Model} = require('mongoose');


const categorySchema = new Schema({
    CategoryName: {
        type: String,
        required: true,
        unique: true
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

const Category = new Model("Category", categorySchema);


module.exports = Category;