import LinkBtn from "../components/LinkBtn"
import logo from "../images/logo.svg"

const page = {
    height: "100%",
    width: "100%",
    display: "grid",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e8e9f3"
}

const startBtn = {
    border: "solid 1px black",
    borderRadius: "6px",
    width: "fit-content",
    paddingLeft: "15px",
    paddingRight: "15px",
    paddingTop: "5px",
    paddingBottom: "5px",
}

function LandingPage(){
    return (
        <div style = {page}>
            <div>
                <div>
                    <div style = {{fontWeight: "bold", fontSize: "60px"}}>Shelfy<img height = "16px" src = {logo}></img></div>
                    <div>The Inventory mangement service you deserve<img height = "5px" src = {logo}></img></div>
                </div>
            </div>
            <LinkBtn link = "/app" text = "Start" style = {startBtn}></LinkBtn>
        </div>
    )
}

export default LandingPage