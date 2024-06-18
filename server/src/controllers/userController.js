const User = require('../models/user')
const hash = require("../services/hash")

const createUser = async(req, res) => {
    try{
        if(req.body.Username == "" || req.body.Email == "" || req.body.FirstName == "" || req.body.LastName == ""){
            res.status(401).json({user: null, msg: "Please provide all fields.", usernameExists: null})
        }else{
            const user = new User({
                Username: req.body.Username,
                Email: req.body.Email,
                FirstName: req.body.FirstName,
                LastName: req.body.LastName
            })
            const auth = hash.hash(req.body.Password)
            user.Password = auth.Password;
            user.Salt = auth.Salt;
            //console.log(auth);
            const check = await User.findOne({Username: req.body.Username}, "Username");
            //console.log(check)
            if(check === null || check.Username === undefined){
                //console.log("saving....")
                user.save();
                res.status(200).json({user, msg: "User created successfully!", usernameExists: true})
            }else{
                res.status(203).json({user: null, msg: "User already exists!", usernameExists: true})
            }
        }
    }catch(e){
        res.status(400).json({user: null, msg: "User created unsuccessfully.", usernameExists: null})
    }
}

const readUser = async(req, res) => {
    try{
        const user = await User.findOne({Username: req.body.Username}, "Username Password Salt Email");
        //const user = await User.find({}, "Username");
        //user.Password = hashed password from DB
        if(hash.validate(req.body.Password, user.Salt, user.Password)){
            
            res.status(200).json({user, msg: "Successful login"});
        }else{
            res.status(203).json({user: null, msg: "Invalid Password or Username"})
        }
        
    }catch(e){
        res.status(401).json({user: null, msg: "Invalid user"})
        
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