const Router = require('express').Router();
const sendMail = require("../services/nodemail")


const email = async (req, res) => {
    try{
        const result = await sendMail(req, res);
        console.log(result);

    }catch(err){
        console.log(err);
    }
}

//Crud
Router.post("/email", email);

//Router.get("/file:filename" , express.static("/images"));
//cRud
//Router.post("/read", imageController.readItem);

//cruD
//Router.get("/delete", imageController.deleteItem);



module.exports = Router;