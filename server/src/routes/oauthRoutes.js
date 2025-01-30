const { generateToken, parseJWT } = require('../middleware/authentication');
const {User} = require('../models/user')
const hash = require("../services/hash")
const jwt = require('jsonwebtoken');


const Router = require('express').Router();
const createUser = async(req, res, next) => {
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
                Salt: auth.Salt,
                TotalItemsCreated: 0,
                ProfilePicture: "",
                AIMessages: [
                    {
                        "role" : "system", 
                        "content" : `
                        Talk in first person. You are an inventory manager for a service named Shelfy you are named Smart Archive, you will only answer questions pertaining to this dataset. 
                        You are not allowed to add or modify items. 
                        Users are allowed to add items themselves in the Inventory Tab of the website.
                        You are allowed to give statistics based on information you know.
                        Give Items in a list manner, use html tags for lists.`
                    }
                ]
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
                next();
                //res.status(203).json({user: null, msg: "User already exists!", usernameExists: true})
            }
        }
    }catch(e){
        res.status(400).json({user: null, msg: "User created unsuccessfully.", usernameExists: null, error: e.toString()})
    }
}

const getToken = async (req, res, next) => {
    try{
        console.log(req.query.code)
        const options = {
            method: "POST",
            mode: "cors",
            headers: {
                "Accept": "application/json",
            },
            query: {
                "client_id" : process.env.GITHUB_OAUTH_CLIENT_ID,
                "client_secret": process.env.GITHUB_OAUTH_CLIENT_SECRET,
                "code" : req.query.code,
                "redirect_uri" : "http://localhost:5173/oauth"
            }
        }
        const uri = `https://github.com/login/oauth/access_token?client_id=${options.query.client_id}&client_secret=${options.query.client_secret}&code=${options.query.code}&redirect_uri=${options.query.redirect_uri}`
        const response = await (await fetch(uri, options)).json();
        console.log(response);
        const userOptions = {
            method: "get", 
            headers: {Authorization: `${response.token_type}  ${response.access_token}`}
        };
        const user = await (await fetch('https://api.github.com/user', userOptions)).json();
        console.log(user)
        req.body.Username = user.id;
        req.body.Email = user.email;
        req.body.Password = response.access_token;
        req.body.FirstName = user.name.split(" ")[0];
        req.body.LastName = user.name.split(" ")[1];
        req.body.ProfilePicture = user.avatar_url;

        next();
    }catch(err){
        next();
    }
}

Router.get("/", getToken, generateToken, createUser);
module.exports = Router;