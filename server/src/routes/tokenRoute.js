const Router = require('express').Router();
const { authenticateToken } = require('../middleware/authentication.js');


Router.post("/", authenticateToken, async(req, res)=> {
    res.status(200).json({status: req.authorization.isAuthorized, data: req.authorization.data})
})


module.exports = Router;