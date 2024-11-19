const Router = require('express').Router();
const {sendMail} = require("../middleware/nodemail")


const email = async (req, res) => {
    try{
        res.status(200).json(req.emailResult)

    }catch(err){
        console.log(err);
    }
}

//Crud
Router.post("/email", sendMail, email);

//Router.get("/file:filename" , express.static("/images"));
//cRud
//Router.post("/read", imageController.readItem);

//cruD
//Router.get("/delete", imageController.deleteItem);



module.exports = Router;