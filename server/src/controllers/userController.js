const { generateToken, parseJWT } = require('../middleware/authentication');
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
                Email: userParameters.Email, 
                FirstName: userParameters.FirstName, 
                LastName: userParameters.LastName
            }

            const user = new User(userParameters);
            console.log(req.token.access_token, "calling from readuser")
            //console.log(auth);
            const check = await User.findOne({Username: req.body.Username}, "Username");
            //console.log(check)
            if(check === null || check.Username === undefined){
                //console.log("saving....")
                user.save();
                res.status(200).json({user: userParametersAccessToken, msg: "User created successfully!", usernameExists: true, access_token: req.token.access_token, expireAt: new Date(parseJWT(req.token.access_token).exp * 1000)})
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
        if(req.body.Username == "" || req.body.Email == "" || req.body.FirstName == "" || req.body.LastName == "" || req.body.Password == ""){
            res.status(401).json({user: null, msg: "Please provide the required fields", usernameExists: null})
        }else{
            const user = await User.findOne({Username: req.body.Username}, "Username Password Salt Email FirstName LastName");
            if(user){
                const userParams = {
                    FirstName: user.FirstName,
                    LastName: user.LastName,
                    Email: user.Email,
                    Username: user.Username,
                }
                const authHeader = req.headers['authorization'];
                const token = authHeader && authHeader.split(' ')[1];
                console.log(token, "Token")
                
                if(req.authorization.isAuthorized) {
                    res.status(200).json({user: userParams, msg: "Successful login via JWT", access_token: token, expireAt: new Date(parseJWT(token).exp * 1000)})
                }else{
                    console.log(req.body.Password)
                    if(hash.validate(req.body.Password, user.Salt, user.Password)){
                        const access_token = jwt.sign(userParams, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'});
                        res.status(200).json({user: userParams, msg: "Successful login and created new JWT", access_token: access_token, expireAt: new Date(parseJWT(token).exp * 1000)});
                    }else{
                        res.status(203).json({user: null, msg: "Invalid Password or Username and or JWT is expired"})
                    }
                }
            }else{
                res.status(203).json({user: null, msg: "Invalid Password or Username"})
            }
        }
        //const user = await User.find({}, "Username");
        //user.Password = hashed password from DB
    }catch(e){
        console.log(e);
        res.status(401).json({user: null, msg: "Invalid user", err: JSON.stringify(e)})
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