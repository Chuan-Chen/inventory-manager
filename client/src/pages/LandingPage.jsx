import LinkBtn from "../components/LinkBtn"
import logo from "../assets/logo.svg"
import shelf from "../assets/shelf2.svg"
import styled from "styled-components"
import { useDispatch, useSelector } from "react-redux"
import { authSlice, getItems } from "../features/authSlice"
import { useEffect } from "react"
import {Link} from "react-router-dom";
import Global from "../styles/Global"

const Container = styled.div`
    height: 100%;
    width: 100%;
    ${Global.Scrollbar}
`
const Page = styled.div`
    height: 100%;
    width: 100%;
    display: grid;
    justify-content: center;
    align-items: center;
    background-color: ${Global.Styles.BackgroundColor};
    place-self: center;
    ${Global.Scrollbar}
`

const Content = styled.div`
    ${Global.Animations.TrackingInFwdTop}
    width: 500px;
    display: grid;
    justify-content: center;
    align-items: center;
    @media only screen and (max-width: 500px) {
    gap: 100px;
    place-self: center;
    width: 100%;
    }
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

const ContactBtn = styled(Link)`


    font-size: .9em;
    text-decoration: none;
    color: white;
    user-select: none;
    text-shadow: white 1px 0 10px;
    border-radius: 4px;
    padding: 2px;

    &:hover {
        box-shadow: 0 0 5px gray;
    }
`

const Footer = styled.div`

    width: 100%;
    height: 50px;
    background: #484d51;
    display: grid;
    align-items: center;
    justify-content: center;
`

const ShelfyContainer = styled.div`
    font-weight: bold;
    font-size: 40px;
    @media only screen and (max-width: 500px) {
        text-align: center;
    }
`

//<img src = {shelf} width = "600px" style = {{position: "absolute", display: 'grid', alignSelf: "center", justifySelf: 'center', zIndex: "0"}}></img>
function LandingPage(){
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);



    return (
    <Container>
        <Page>
            <Content>
            <div style={{zIndex: "1"}}>
                <div>
                    <ShelfyContainer>Shelfy<img height = "16px" src = {logo}></img></ShelfyContainer>
                    <ShelfyContainer style = {{fontWeight: "300",fontSize: "16px"}}>The Inventory mangement service you deserve<img height = "5px" src = {logo}></img></ShelfyContainer>
                </div>
            </div>
            {(()=>{
                if(isAuthenticated){
                    return <LinkBtn link = "/app/inventory" text = {`Welcome back, ${JSON.parse(localStorage.getItem('user')).FirstName}`} style = {startBtn}></LinkBtn>
                }else{
                    return <LinkBtn link = "/auth" text = "Get Started" style = {startBtn}></LinkBtn>
                }
            })()}
            </Content>
        
        </Page>
        <Footer>
            <ContactBtn to={"/contact-me"}>Contact Me</ContactBtn>
            
        </Footer>
    </Container>
    
    )
}

export default LandingPage