import { useState } from "react"


export default function AIChat() {
    const [text, setText] = useState("");
    const [chatMessage, setChatMessage] = useState({
        "message" : "",
        "state" : "pending"
    });
    const endPoint = "http://localhost:3000/api/ai/chat";

    const sendChat = async () => {
        console.log(chatMessage.message)
        const options = {
                "method" : "POST",
                "headers" : {
                    "Content-Type": "application/json",
                    "authorization" : "Bearer " + localStorage.getItem('access_token'),
                },
                "body" : JSON.stringify({
                    "Username" : "123",
                    "Email" : "123",
                    "LastName" : "123",
                    "message" : {
                            "role" : "user",
                            "content" : text
                    }
                })

        }
        //setChatMessage({...chatMessage, state: "successful", message: JSON.stringify(data)})
        const result = await fetch(endPoint, options).then(data => data.json()).then(data => {
            setChatMessage({...chatMessage, state: "successful", message: data.message.content})
        });
        
        
        

        
        //setChatMessage({"message" : await result.json(), "state" : "successful"});
    }

    const changeManager = (e) => {
        setText(e.target.value);
        if(e.key == "Enter"){
            sendChat();
        }
    }

    return (
        <div>
            <input type = "textbox" style = {{height: "200px", width: "400px"}} onKeyUp={changeManager}></input>
            <button onClick={sendChat}>submit</button>
            <div>
            {chatMessage.state == "successful" ? chatMessage.message : "Thinking..."}
            </div>
            
        </div>

    )
}