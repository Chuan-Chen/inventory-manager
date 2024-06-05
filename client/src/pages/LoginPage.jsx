import { useState } from "react";
import LinkBtn from "../components/LinkBtn";
import Back from "../images/back.svg"
import InputText from "../components/InputText"

const inputStyle = {
    
}

function LoginPage(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    return (
        <div style = {{height: '100%', width: '100%', display: 'grid', alignItems: "center", justifyContent: "center", backgroundColor: "#e8e9f3"}}>
            <div style = {{position: "relative",height: '500px', width: '500px', boxShadow: "0 0 4px black", borderRadius: "5px", display: "grid", alignItems: "center", justifyContent: 'center', backgroundColor: "white"}}>
                <div style = {{position: "absolute", top: "8px", left: "8px", display: "grid", gridAutoFlow: "column", justifyContent: "center", alignItems: "center"}}>
                    <img src = {Back}></img>
                    <LinkBtn link = "/" text = "Back" style = {{width: "fit-content", borderRadius: "4px"}}></LinkBtn>
                </div>
                <div>Sign In</div>
                <div style={{display: "grid", gridAutoFlow: "row", gap: '10px'}}>
                    <InputText placeholder="Username" style = {inputStyle}></InputText>
                    <InputText placeholder="Password" style = {inputStyle}></InputText>
                    <button>Login</button>
                </div>
                <div>
                    <div>No Account create one here!</div>
                    <LinkBtn link = "/createaccount" text = "Create Account"></LinkBtn>
                </div>
                
            </div>
        </div>
    )
}


export default LoginPage;