const {User, userSchema} = require('../models/user')
const {Item} = require('../models/item')

const AIChat = async (req, res) => {
    try{
        const user = await User.findOne({Username: req.body.Username}, "AIMessages");
        const items = await Item.find({Username: req.body.Username}, "Username ItemName ItemImage ItemBarcode ItemCategory createdAt updatedAt ItemID")

        console.log(JSON.stringify(items))

        const options = {
            "method" : "POST",
            "headers" : {
                "Content-Type": "application/json",
            },
            "body" : JSON.stringify({
                "model" : "llama3:latest",
                "messages" : [
                    {
                        "role" : "system",
                        "content" : JSON.stringify(items)
                    }, 
                    ...user.AIMessages,
                    {...req.body.message}
                ],
                "stream" : false
            })
        }
        console.log(options) 
        const chat = await fetch('http://192.168.1.172:11434/api/chat', options);

        //await User.findOneAndUpdate({Username: "123"}, {"$push": {AIMessages: {...req.body.messages}, AIMessages: {...await chat.json().messages}}});

        const result = await chat.json();
        await User.findOneAndUpdate({Username: "123"}, {"$push": {AIMessages: {...req.body.message}}});
        
        res.status(200).json({...result})
    }catch(err) {
        res.status(400).json({err})
    }



    //console.log(await chat.json());

}


const Test = async(req, res) => {
    const user = await User.findOne({Username: "123"}, "AIMessages");

    res.json(user.AIMessages)
}


module.exports = {
    AIChat,
    Test
}