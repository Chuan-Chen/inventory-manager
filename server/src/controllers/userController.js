const User = require('../models/user')


const createUser = async(req, res) => {
    try{
        const user = new User({
            Username: req.body.Username
        })
        user.Password = user.generateHash(req.body.Password);
        user.save();
        res.status(200).json({user})
    }catch(e){
        res.status(400).json({msg: "user not created!" })
    }
}

const readUser = async(req, res) => {
    try{
        const username = req.body.Username;
        const password = req.body.Password;
        const user = await User.findOne({"Username": username, "Password": password}).exec();
        //const user = await User.find({});
        res.status(200).json({user})
    }catch(e){
        res.status(400).json({msg: "user doesn't exist"})
    }
}

const updateUser = async(req, res) => {
    try{

    }catch(e){
        
    }
}

const deleteUser = async(req, res) => {
    try{

    }catch(e){
        
    }
}

module.exports = {
    createUser,
    readUser,
    updateUser,
    deleteUser
}