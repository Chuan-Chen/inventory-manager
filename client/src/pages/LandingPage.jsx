import LinkBtn from "../components/LinkBtn"
import logo from "../assets/logo.svg"
import shelf from "../assets/shelf2.svg"
import styled from "styled-components"
import { useDispatch, useSelector } from "react-redux"
import { authSlice } from "../features/authSlice"

const page = {
    height: "100%",
    width: "100%",
    display: "grid",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e8e9f3"
}

const Page = styled.div`

    height: 100%;
    width: 100%;
    display: grid;
    justify-content: center;
    align-items: center;
    background-color: #e8e9f3;
`

const Content = styled.div`
    @keyframes tracking-in-expand-fwd-top {
            0% {
                letter-spacing: -0.5em;
                -webkit-transform: translateZ(-700px) translateY(-500px);
                        transform: translateZ(-700px) translateY(-500px);
                opacity: 0;
            }
            40% {
                opacity: 0.6;
            }
            100% {
                -webkit-transform: translateZ(0) translateY(0);
                        transform: translateZ(0) translateY(0);
                opacity: 1;
            }
        }
    animation: tracking-in-expand-fwd-top 0.8s cubic-bezier(0.215, 0.610, 0.355, 1.000) both;
    width: 500px;
    display: grid;
    justify-content: center;
    align-items: center;
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

//<img src = {shelf} width = "600px" style = {{position: "absolute", display: 'grid', alignSelf: "center", justifySelf: 'center', zIndex: "0"}}></img>
function LandingPage(){
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    return (
    <Page>
        <Content>
        <div style={{zIndex: "1"}}>
            <div>
                <div style = {{fontWeight: "bold", fontSize: "40px"}}>Shelfy<img height = "16px" src = {logo}></img></div>
                <div>The Inventory mangement service you deserve<img height = "5px" src = {logo}></img></div>
            </div>
        </div>
        {(()=>{
            if(isAuthenticated){
                return <LinkBtn link = "/app" text = {`Welcome back, ${JSON.parse(localStorage.getItem('user')).FirstName}`} style = {startBtn}></LinkBtn>
            }else{
                return <LinkBtn link = "/auth" text = "Get Started" style = {startBtn}></LinkBtn>
            }
        })()}
        </Content>
    </Page>
    )
}

export default LandingPage