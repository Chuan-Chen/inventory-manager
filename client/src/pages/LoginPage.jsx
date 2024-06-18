import { useState } from "react";
import LinkBtn from "../components/LinkBtn";
import Back from "../images/back.svg"
import InputText from "../components/InputText"
import Logo from "../images/logo.svg"
import GithubLogo from "../images/github-mark.svg"
import {LoginBtn} from "../components/StyledComponents"
import DownArrow from "../images/down_arrow.svg"
import styled from "styled-components";
import { Login, Signup, SignupWithGithub } from "../components/AuthFunctions";
import { useNavigate } from "react-router-dom";



const Page = styled.div`
    height: 500px;
    width: 450px;
    box-shadow: 0 0 4px black;
    border-radius: 5px;
    display: grid;
    align-items: center;
    justify-content: center;
    background-color: white;
    position: relative;

    @media (max-width: 450px){
        width: 100vw;
        height: 100vh;
    }
`

function LoginPage(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRepassword] = useState("");
    const [email, setEmail] = useState("");
    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");
    const [userExists, setUserExists] = useState("false");

    const [isSignup, setisSignup] = useState(false);

    const navi = useNavigate();

    const handleUser = () => {
        setUserExists(!userExists);
    }

    const handleNavi = () => {
        navi("/app");
    }
    const reset = () => { 
        setUsername("");
        setPassword("");
        setEmail("");
        setFName("");
        setLName("");
    }
    const handleSignup = () => {
        
        setisSignup(!isSignup);
        
    }

    //current issue [ ] cannot reset input fields

    return (
        <div style = {{height: '100%', width: '100%', display: 'grid', alignItems: "center", justifyContent: "center", backgroundColor: "#e8e9f3"}}>
            <Page>
                <div style = {{position: "absolute", top: "19px", left: "19px", display: "grid", gridAutoFlow: "column", justifyContent: "center", alignItems: "center"}}>
                    <img src = {Back}></img>
                    {isSignup ? <LinkBtn text = "Login" style = {{width: "fit-content", borderRadius: "4px"}} onClick = {handleSignup}></LinkBtn> : <LinkBtn link = "/" text = "Back" style = {{width: "fit-content", borderRadius: "4px"}}></LinkBtn>}
                </div>
                <div style = {{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "end", height: "100%", width: "100%"}}>
                    <img src = {Logo} style = {{height: "80px"}}></img>
                    <div>Shelfy</div>
                </div>
                <div style = {{height: "1px", width: "100%", alignSelf: "end", backgroundColor: "lightgray"}}></div>
                <div style={{display: "grid", gridAutoFlow: "row", gap: '10px'}}>
                    <div style = {{display: isSignup ? "grid" : "none", gap: "10px"}}>
                        
                        <InputText placeholder="First Name" onChange={(e)=>{setFName(e.target.value)}}></InputText>
                        <InputText placeholder="Last Name" onChange={(e)=>{setLName(e.target.value)}}></InputText>
                        <InputText placeholder="E-mail" onChange={(e)=>{setEmail(e.target.value)}}></InputText> 
                    </div>
                    
                    <InputText placeholder="Username" onChange={(e)=>{setUsername(e.target.value)}} style ={{boxShadow: `0 0 2px ${userExists && isSignup? "red" : "black"}`}}></InputText>
                    <InputText placeholder="Password" type = "password" onChange={(e)=>{setPassword(e.target.value)}}></InputText>
                    {isSignup ? <InputText placeholder="Retype Password" type = "password" onChange={(e)=>{setRepassword(e.target.value)}}></InputText> : ""}
                    <LoginBtn style = {{height: "100%", width: "100%"}} onClick={()=>{
                        if(isSignup){
                            Signup(username, password, email, fName, lName).then((res)=>{if(res.user != null){console.log(res); }else{alert(res.msg); console.log(res); setUserExists(true)}});
                            handleUser();
                        }else{
                            Login(username, password).then((res)=>{if(res.user != null){handleNavi(); console.log(res)}else{alert(res.msg)}});
                        }
                        }}> {isSignup ? "Create Account" : "Login"} </LoginBtn> 
                    <LoginBtn style = {{display: isSignup? "none" : "grid", gridAutoFlow: "column", height: "100%", width: "100%", alignItems: "center", justifyContent: "center", gap: "8px"}} onClick={(e)=>{
                        window.location.href = "https://github.com/login/oauth/authorize?client_id=Ov23li89YEGmiemPiS1t";
                        }}><img src = {GithubLogo} height={"20px"}></img><div>Login with Github</div></LoginBtn>
                </div>
                <div style = {{display: isSignup ? "none" : "grid", alignItems: "center", justifyContent: "center", gap: "2px"}}>
                    <LinkBtn text = "Sign Up" style = {{borderRadius: "5px", backgroundColor: "#f0f0f0", padding: '5px', textAlign: "center"}} onClick = {handleSignup}></LinkBtn>
                    <div style = {{fontSize: ".7em", textAlign: 'center', display: "grid", gridAutoFlow: "column", alignItems: "center", justifyContent: "center", gap: "5px"}}>Create account here<img src = {DownArrow} height={"15px"} style = {{transform: "rotate(180deg)"}}></img></div>
                </div>
            </Page>
            
        </div>
    )
}


export default LoginPage;