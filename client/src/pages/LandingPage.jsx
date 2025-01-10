import LinkBtn from "../components/LinkBtn"
import logo from "../assets/logo.svg"
import shelf from "../assets/shelf2.svg"
import styled from "styled-components"
import Github from "../assets/github-circle-svgrepo-com.svg"
import PortfolioIcon from "../assets/portfolio.svg"
import Mail from "../assets/mail.svg"
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
    display: grid;
    grid-auto-flow: column;
    align-items: center;
    gap: 3px;
    justify-content: center;
    &:hover {
          box-shadow: 0px 15px 35px -5px rgba(23, 53, 87, 0.59);
          background: #1f202a;
          color: white;
          text-shadow: 0px 0px 10px white;
          transition: all .5s ease-out;
    }
`

const Footer = styled.div`
    grid-auto-flow: column;
    width: 100%;
    height: 50px;
    background: #484d51;
    display: grid;
    align-items: center;
    gap: 3px;
    justify-content: center;
`

const FooterGithub = styled.a`

    font-size: .9em;
    text-decoration: none;
    color: white;
    user-select: none;
    text-shadow: white 1px 0 10px;
    border-radius: 4px;
    padding: 2px;
    display: grid;
    grid-auto-flow: column;
    align-items: center;
    justify-content: center;
    gap: 3px;
    &:hover {
          box-shadow: 0px 15px 35px -5px rgba(23, 53, 87, 0.59);
          background: #1f202a;
          color: white;
          text-shadow: 0px 0px 10px white;
          transition: all .5s ease-out;
    }

`

const FooterUser = styled.a`
    font-size: .9em;
    text-decoration: none;
    color: white;
    user-select: none;
    text-shadow: white 1px 0 10px;
    border-radius: 4px;
    padding: 2px;
    display: grid;
    grid-auto-flow: column;
    align-items: center;
    gap: 3px;
    justify-content: center;
    &:hover {
          box-shadow: 0px 15px 35px -5px rgba(23, 53, 87, 0.59);
          background: #1f202a;
          color: white;
          text-shadow: 0px 0px 10px white;
          transition: all .5s ease-out;
    }
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
            <FooterUser href = "https://self.nauhc.dev" target="_blank"><img src = {PortfolioIcon} height = "16px" style = {{filter: "invert(100%)"}}></img>Chuan Chen</FooterUser>
            <div style = {{color: "#c9d6df"}}>&#8226;</div>
            <FooterGithub href = "https://github.com/Chuan-Chen" target="_blank"> <img src = {Github} height = "16px" style = {{filter: "invert(100%)"}}></img> Github</FooterGithub>
            <div style = {{color: "#c9d6df"}}>&#8226;</div>
            <ContactBtn to={"/contact-me"}> <img src = {Mail} height = "16px" style = {{filter: "invert(100%)"}}></img>Contact Me</ContactBtn>
            
        </Footer>
    </Container>
    
    )
}

export default LandingPage