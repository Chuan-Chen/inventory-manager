import { useEffect, useState } from "react"
import arrowUp from "../../assets/arrowUp.svg";
import styled from "styled-components"
import computer from "../../assets/logo.svg"
import Global from "../../styles/Global";

/**
  @media only screen and (max-width: 768px) {
    width: 95%;
  }
 */

const LocalVar = {
    AccentColor : "#8facc0",
    PrimaryColor: "",
    PageColor: "",
    TextBoxColor: "#c9d6df",

}


const Page = styled.div`
    ${Global.Animations.SlideInTop}
    height: 100%;
    width: 100%;
    display: grid;
    background-color: ${LocalVar.PageColor};
`

const Container = styled.div`
    height: 90%;
    width: 85%;
    display: grid;
    grid-template-rows: 1fr min-content;
    align-self: center;
    justify-self: center;

`

const TextInput = styled.input`

    background-color: ${LocalVar.AccentColor};
    padding: 10px;
    border: none;
    height: 30px;
    width: 90%;
    border-radius: 5px;
    font-size: 20px;
    &:focus{
        outline: none;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
`

const TextFieldContainer = styled.div`
    display: flex;
    justify-content: center;
    &:active{
        border: none;
    }
`

const MessageContainer = styled.div`
    height: 95%;
    width: calc(85% + 20px);
    place-self: center;
    display: flex;
    flex-direction: column;
    gap: 20px;
`

const SubmitBtn = styled.img`
    position: absolute;
    
    right: calc(5% + 20px);
    cursor: pointer;
    &:focus{
        outline: none;
        box-shadow: 0 15px 10px -15px black;
    }
`

//-------------------------------------------------------

const ChatContainer = styled.div`
    ${Global.Animations.FadeInBottom}
    width: fit-content;
    background-color: ${props => props.$role == 'user' ? LocalVar.AccentColor : 'none'};
    border-radius: 5px; 
    display: flex;
    align-self: ${props => props.$role == 'user' ? 'end' : 'start'};
    min-width: 0px;
    min-height: 0px;
    height: fit-content;
    @media only screen and (max-width: 600px) {
        width: 100%;
        justify-self: center;
    }

`

const UserImage = styled.img`
    height: 32px;
    width: 32px;
    border-radius: 50%; 
    display: inline-block;
    align-self: center;
    margin: 10px;
    justify-self: end;
    object-fit: cover;
`

const SystemImage = styled.img`
    min-height: 32px;
    min-width: 32px;
    align-self: center;
    justify-self: start;

    margin: 10px;
`

const UserTextBox = styled.div`
    width: 100%;
    height: fit-content;
    min-width: 0px;
    min-height: 0px;
    margin: 10px;
    align-self: center;
    text-wrap: wrap;

`
const SystemTextBox = styled.div`
    width: 100%;
    height: fit-content;
    min-width: 0px;
    min-height: 0px;
    margin: 10px;
    align-self: center;
`

function Chat({role, content}){

    useEffect(()=>{

    }, [])
    //come back around to fixing innerhtml
    return (
        <ChatContainer $role = {role}>
            {role == "user" ? 
            <><UserTextBox>{content}</UserTextBox><UserImage src = {localStorage.getItem("ProfilePicture")} alt = ""></UserImage></> : 
            <><SystemImage src = {computer}></SystemImage><SystemTextBox><div dangerouslySetInnerHTML={{ __html: content }}></div></SystemTextBox></>}
        </ChatContainer>
    )
}

//-------------------------------------------------------

//add function to cache and save convo to local storage


export default function AIChat() {
    const [text, setText] = useState("");
    const [chatMessage, setChatMessage] = useState({
        "message" : "",
        "state" : "pending"
    });


    const [messageStack, setmessageStack] = useState([]);

    useEffect(()=>{
        if(chatMessage.state != "pending"){
            setmessageStack([...messageStack, {"role" : "assistant", "content": chatMessage.message}]);
            
            setChatMessage({"message" : "", "state" : "pending"})
        }
        /**
        
        if(messageStack.length == 0 && localStorage.getItem("messages") != ""){
            
            setmessageStack([JSON.parse(localStorage.getItem("messages"))])
        }
         */
    }, [chatMessage])


    const endPoint = "http://localhost:3000/api/ai/chat";

    const sendChat = async () => {
        //console.log(chatMessage.message)
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
            localStorage.setItem("messages", `${localStorage.getItem('messages')}, ${JSON.stringify({"role" : "assistant", "content" : data.message.content})}`);
        });
        
        
        

        
        //setChatMessage({"message" : await result.json(), "state" : "successful"});
    }

    const changeManager = (e) => {
        setText(e.target.value);
        if(e.key == "Enter"){
            sendChat();
            setmessageStack([...messageStack, {"role" : "user", "content": e.target.value}])
            localStorage.setItem("messages", JSON.stringify({"role" : "user", "content" : e.target.value}));
            //console.log(messageStack)
            e.target.value = "";
        }
    }
//<input type = "textbox" style = {{height: "200px", width: "400px"}} onKeyUp={changeManager}></input>
    return (
        <Page>
            <Container>            
                    <MessageContainer>
                        {messageStack.map((e, index)=>{
                            
                            return <Chat key = {index} role = {e.role} content = {e.content}></Chat>
                        })}
                    </MessageContainer>
                    <TextFieldContainer>
                        <div style = {{width: "100%", placeSelf: "center", display: "flex", justifyContent: "center", alignItems: "center", position: "relative", padding: "20px"}}>
                            <TextInput onKeyUp={changeManager} placeholder = "Ask me a question!"></TextInput>
                            <SubmitBtn onClick={sendChat} src = {arrowUp} ></SubmitBtn>
                        </div>
                    </TextFieldContainer>
            </Container>
        </Page>

    )
}