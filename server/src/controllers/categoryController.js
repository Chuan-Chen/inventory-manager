const Category = require('../models/category')
const {User} = require("../models/user")

const createCategory = async(req, res) => {
    try{
        const categoryOptions = {
            Username: req.body.Username,
            CategoryName: req.body.CategoryName,
            CategoryDescription: req.body.CategoryDescription,
            CategoryImage: req.body.CategoryImage
        };
        const category = new Category(categoryOptions);
        const user = await User.findOneAndUpdate({Username: category.Username}, {"$push": { Categories: category._id }}, {new: true});
        if(user == null){
            res.status(404).json({category: categoryOptions, msg: "Category created unsuccessfully"})
        }else{
            category.save();
            res.status(200).json({category: categoryOptions, msg: "Category create successfully"})
        }

    }catch(err){
        console.log(err);
        res.status(400).json({category: null, msg: err})
    }
}

const readCategory = async(req, res) => {
    try{
        const filter = {
            Username: req.body.Username,
            CategoryName: req.body.CategoryName,
            CategoryDescription: req.body.CategoryDescription,
        }
        const result = await Category.find({"$or" : [{Username: filter.Username},{CategoryName: filter.CategoryName},{CategoryDescription: filter.CategoryDescription}]});
        console.log(result)
        res.status(200).json({result, msg: "Search Successful"});
    }catch(err){
        res.status(400).json({result: filter, msg: "Search Unsuccessful"});
    }
}

const updateCategory = async(req, res) => {
    try{
        
    }catch(err){
        
    }
}

const deleteCategory = async(req, res) => {
    try{

    }catch(err){
        
    }
}

module.exports = {
    createCategory,
    readCategory,
    updateCategory,
    deleteCategory
}