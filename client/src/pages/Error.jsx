import styled from "styled-components"
import logo from "../assets/logo.svg"
import LinkBtn from "../components/LinkBtn"
import { useParams, Outlet } from "react-router-dom"
import Global from "../styles/Global"


const ErrorText = styled.div`
    ${Global.Animations.TextPopUpTop}

`

const Page = styled.div`

    display: grid;
    
    height: 100%;
    width: 100%;
    justify-content: center;
    background-color: #e8e9f3;
    transition: font-size;
    font-size: 2em;
    font-weight: bold;
`
const startBtn = {
        zIndex: "1",
        border: "solid 1px black",
        borderRadius: "6px",
        width: "fit-content",
        paddingLeft: "15px",
        paddingRight: "15px",
        paddingTop: "5px",
        paddingBottom: "5px",
    }


export default function Error({errorcode, redirectLink, redirectLinkText}){
        const {error} = useParams();
        return (
                <Page>
                        
                <ErrorText style = {{alignSelf: "end", justifySelf: "center", margin: "60px"}}>Error : {errorcode}{error}</ErrorText>
                <LinkBtn link = {redirectLink ? redirectLink : "/auth"} text = {redirectLinkText ? redirectLinkText : "Login"} style = {{...startBtn, alignSelf: "start", justifySelf: "center"}}></LinkBtn>
                
                </Page>
        )
}