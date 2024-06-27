import LinkBtn from "../components/LinkBtn"
import logo from "../assets/logo.svg"
import shelf from "../assets/shelf2.svg"
import styled from "styled-components"


const page = {
    height: "100%",
    width: "100%",
    display: "grid",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e8e9f3"
}

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
    return (
    <div style = {page}>
        <div style = {{display: "grid",justifyContent: "center",alignItems: "center", width: "500px"}}>
        <div style={{zIndex: "1"}}>
            <div>
                <div style = {{fontWeight: "bold", fontSize: "40px"}}>Shelfy<img height = "16px" src = {logo}></img></div>
                <div>The Inventory mangement service you deserve<img height = "5px" src = {logo}></img></div>
            </div>
        </div>
        <LinkBtn link = "/auth" text = "Get Started" style = {startBtn}></LinkBtn>
        </div>
    </div>
    )
}

export default LandingPage