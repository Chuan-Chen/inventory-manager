const Category = require('../models/category')


const createCategory = async(req, res) => {
    try{
        
    }catch(err){
        res.status(400).json({category: null})
    }
}

const readCategory = async(req, res) => {

}

const updateCategory = async(req, res) => {

}

const deleteCategory = async(req, res) => {

}

module.exports = {
    createCategory,
    readCategory,
    updateCategory,
    deleteCategory
}