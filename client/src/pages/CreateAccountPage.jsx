import LinkBtn from "../components/LinkBtn";
import { useState } from "react";
import InputText from "../components/InputText";
import Back from "../images/back.svg"

function CreateAccountPage (){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div style = {{height: '100%', width: '100%', display: 'grid', alignItems: "center", justifyContent: "center", backgroundColor: "#e8e9f3"}}>
            <div style = {{position: "relative", height: '500px', minWidth: '500px', boxShadow: "0 0 4px black", borderRadius: "5px", display: "grid", alignItems: "center", justifyContent: 'center', backgroundColor: "white"}}>
                
                <div style = {{position: "absolute", top: "8px", left: "8px", display: "grid", gridAutoFlow: "column", justifyContent: "center", alignItems: "center"}}>
                    <img src = {Back}></img>
                    <LinkBtn link = "/login" text = "Login" style = {{width: "fit-content", borderRadius: "4px"}}></LinkBtn>
                </div>
                
                <div style={{display: "grid", gridAutoFlow: "row", gap: '10px'}}>
                    <InputText placeholder="First Name"></InputText>
                    <InputText placeholder="Last Name"></InputText>
                    <InputText placeholder="E-mail"></InputText>
                    <InputText placeholder="Username" style = {{}}></InputText>
                    <InputText placeholder="Password" style = {{}}></InputText>
                    <button>Create</button>
                </div>
            </div>
        </div>
    )
}

export default CreateAccountPage