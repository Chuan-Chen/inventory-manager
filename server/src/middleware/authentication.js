const jwt = require("jsonwebtoken");
require('dotenv').config();

const generateToken = (req, res, next) => {
    const userParametersAccessToken = {
        Username: req.body.Username, 
        Email: req.body.Email, 
        FirstName: req.body.firstName,
        LastName: req.body.LastName
    }
    const access_token = jwt.sign(userParametersAccessToken, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15min'});
    const refresh_token = jwt.sign(userParametersAccessToken, process.env.REFRESH_ACCESS_TOKEN_SECRET)
    req.token = {access_token: access_token, refresh_token: refresh_token}
    next();
};


const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null) return res.status(401).json();
    console.log("verifying user")

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.status(403).json();
        req.user = user;
        next();
    });
};

module.exports = {generateToken, authenticateToken}
