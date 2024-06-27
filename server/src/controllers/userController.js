const User = require('../models/user')
const hash = require("../services/hash")
const jwt = require('jsonwebtoken');
require("dotenv").config();

const createUser = async(req, res) => {
    try{
        //console.log(req)
        if(req.body.Username == "" || req.body.Email == "" || req.body.FirstName == "" || req.body.LastName == "" || req.body.Password == ""){
            res.status(401).json({user: null, msg: "Please provide all fields.", usernameExists: null})
        }else{
            const auth = hash.hash(req.body.Password);
            const userParameters = {
                Username: req.body.Username,
                Password: auth.Password,
                Email: req.body.Email,
                FirstName: req.body.FirstName,
                LastName: req.body.LastName,
                Salt: auth.Salt
            }

            const userParametersAccessToken = {
                Username: userParameters.Username, 
                Email: userParameters.Email, FirstName: 
                userParameters.FirstName, 
                LastName: userParameters.LastName
            }

            const user = new User(userParameters);
            console.log(req.token.access_token)
            console.log(req.token.refresh_token)
            //console.log(auth);
            const check = await User.findOne({Username: req.body.Username}, "Username");
            //console.log(check)
            if(check === null || check.Username === undefined){
                //console.log("saving....")
                user.save();
                res.status(200).json({user: userParametersAccessToken, msg: "User created successfully!", usernameExists: true, Access_Token: req.access_token})
            }else{
                res.status(203).json({user: null, msg: "User already exists!", usernameExists: true})
            }
        }
    }catch(e){
        res.status(400).json({user: null, msg: "User created unsuccessfully.", usernameExists: null, error: e.toString()})
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