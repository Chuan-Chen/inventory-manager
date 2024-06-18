const Router = require('express').Router();



Router.get("/", (req, res) => {
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
                "redirect_uri" : "http://localhost:3000/api/oauth"
            }
        }
        const uri = `https://github.com/login/oauth/access_token?client_id=${options.query.client_id}&client_secret=${options.query.client_secret}&code=${options.query.code}&redirect_uri=${options.query.redirect_uri}`
        const response = fetch(uri, options)
        .then(
            async (data) => {
                return await data.json()
            })
        .then(
            (data) => {
                res.redirect(`http://localhost:1573/oauth/access_token=${data.access_token}?token_type=${data.token_type}`)
            });
});


module.exports = Router;