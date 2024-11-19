const nodemailer = require("nodemailer");
const path = require("path");
const dotenv = require("dotenv")
dotenv.config({path: path.resolve(__dirname , '../../.env')});

const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "testingandspamming@gmail.com",
        pass: process.env.NODEMAILER_APP_PASSWORD
    } 
})


const mailList = ["chuan7901@gmail.com", "chuan.chen.info@gmail.com"]

const sendMail = async (req, res, next) => {

    try{
        const mailOption = {
            from: {
                name: `Inventory-App(${req.body.email.from})`,
                address: "inventory@management.com"
            },
            to: mailList,
            subject: req.body.email.subject,
            html: `
            <div>This email is auto generated sent from Inventory Management App. </div>
            <br></br>
            <div>from: ${req.body.email.from}</div>
            <div>message: ${req.body.email.body}</div>
            `,
        }
        
        transporter.sendMail(mailOption, (error, info) => {
            if(error){
                console.log(error);
                next();
            }else{
                console.log(info.response);
                req.emailResult = info.response;
                next();
            }
             
        })
    }catch(err){
        res.json({msg: err})
    }


}


module.exports = {
    sendMail
}