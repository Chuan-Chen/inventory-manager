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


const sendMail = async (req, res) => {

    const mailOption = {
        from: {
            name: "Inventory-App Contacts",
            address: "inventory@management.com"
        },
        to: "chuan7901@gmail.com",
        subject: "testing",
        html: "<div>hi this is from some test</div>",
    }
    
    transporter.sendMail(mailOption, (error, info) => {
        if(error){
            console.log(error);
        }else{
            console.log(info.response);
            return new Promise((resolve,reject) => {
                resolve({response: info.response})
            })
        }
    })
}


module.exports = {
    sendMail
}