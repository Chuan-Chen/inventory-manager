const jwt = require("jsonwebtoken");
const {User} = require('../models/user')
const hash = require("../services/hash")
require('dotenv').config();

const generateToken = (req, res, next) => {
    const userParametersAccessToken = {
        Username: req.body.Username, 
        Email: req.body.Email, 
        FirstName: req.body.firstName,
        LastName: req.body.LastName
    }
    const access_token = jwt.sign(userParametersAccessToken, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'});
    const refresh_token = jwt.sign(userParametersAccessToken, process.env.REFRESH_ACCESS_TOKEN_SECRET)
    req.token = {access_token: access_token, refresh_token: refresh_token}
    req.authorization = {isAuthorized: true};
    next();
};

const authenticateToken = async (req, res, next) => {
    try{
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if(token === null || token == undefined){
            //return res.status(401).json({msg: "Not Authorized contact admin or enter correct JWT"})
            req.authorization = {isAuthorized: false}
            console.log(req.authorization.isAuthorized)
            return next();
        }
        const parsedToken = parseJWT(token);
        if((new Date() * 1000) < new Date(parsedToken.exp*1000)){
            return res.status(401).json({result: null, msg: "Token Expired please login again."})
        }
        
        //console.log(parsedToken);
        //console.log(new Date(parsedToken.iat*1000))
        //console.log(new Date(parsedToken.exp*1000));
        if(token == null) return res.status(401).json({msg: "null token"});
        if((req.body.Username != parsedToken.Username && req.body.LastName != parsedToken.LastName && req.body.Email != parsedToken.Email) ) {
            console.log(parsedToken)
            console.log(req.body)
            return res.status(401).json({result: null, msg: "Not Authorized, include Username, LastName and Email with Token."})
        }
        
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if(err) {
                req.authorization = {isAuthorized: false};
            }else{
                req.authorization = {isAuthorized: true}
                req.authorization.data = {parsedToken}
            };
            //req.token = {access_token: token};
            next();
        });
    }catch(err){
        console.log(err);
        req.authorization = {isAuthorized: false}
        next();
    }
};

function parseJWT (token) {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}

function tokenExpiration(token){
    return new Date(parseJWT(token));
}

module.exports = {generateToken, authenticateToken, parseJWT}
