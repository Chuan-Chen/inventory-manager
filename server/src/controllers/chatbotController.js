const {User} = require('../models/user')
const {Item} = require('../models/item')

const AIChat = async (req, res) => {
    try{

        //const user = await User.findOne({Username: "123"}, "AIMessages").json();

        const options = {
            "method" : "POST",
            "headers" : {
                "Content-Type": "application/json",
            },
            "body" : JSON.stringify({
                "model" : "neural-chat:latest",
                "messages" : [
          //          {...user.AIMessages},
                    {...req.body.message}
                ],
                "stream" : false
            })
        }
        console.log(options) 
        const chat = await fetch('http://192.168.1.172:11434/api/chat', options);

        //await User.findOneAndUpdate({Username: "123"}, {"$push": {AIMessages: {...req.body.messages}, AIMessages: {...await chat.json().messages}}});

        const result = await chat.json();
        await User.findOneAndUpdate({Username: "123"}, {"$push": {AIMessages: {"$each" : [{...req.body.message}, {...result.message}]}}});
        
        res.status(200).json({...result})
    }catch(err) {
        res.status(400).json({err})
    }



    //console.log(await chat.json());

}

module.exports = {
    AIChat
}