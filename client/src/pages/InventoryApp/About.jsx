import styled from "styled-components"
import { useEffect, useState } from "react";
import github from "../../assets/github-circle-svgrepo-com.svg"
import linkedin from "../../assets/linkedin-svgrepo-com.svg"
import portfolio from "../../assets/portfolio-case-business-suitcase-svgrepo-com.svg"
import { useDispatch } from "react-redux";
import { authSlice } from "../../features/authSlice";
import {Link, useParams} from "react-router-dom";
import LinkBtn from "../../components/LinkBtn";
import Global from "../../styles/Global";

const Page = styled.div`
  ${Global.Animations.SlideInTop}
  min-height: 100%;
  width: 100%;
  display: grid;
  background-color: #e8e9f3;
  grid-auto-flow: column;

`
const validEmail = new RegExp(
  '^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$'
);

const validName = new RegExp(
  "(^[A-Za-z]{3,16})([ ]{0,1})([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})"
);


const LeftWrapper = styled.div`
  display: grid;
  height: 100%;
  width: 100%;
`

const RightWrapper = styled.div`
  display: grid;
  border: 1px solid #babab6;
  background-color: #e8e9f3;
  margin: 70px;
  @media(max-width: 800px){
      margin: 0px;
      border: 0px;
  }
`

const Image = styled.img`
  height: 80%;
  width: auto;
  object-fit: contain;
  align-self: center;
  justify-self: center;
  border-radius: 2px;
  @media(max-width: 500px){
      width: 100%;
      height: auto;
  }
`

const RightWrapperInner = styled.div`
  background-color: inherit;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-areas:
  "header header"
  "bodyL bodyR"
  "bodyL bodyR"
  "bodyL bodyR"
  "bodyL bodyR";
  @media(max-width: 1140px){
      
      grid-template-areas:
      "header header"
      "bodyR bodyR"
      "bodyR bodyR"
      "bodyL bodyL"
      "bodyL bodyL";
  }
     
`

const Contact = styled.div`
  >* {
      display: grid;
      user-select: none;
      
      label{
          font-weight: bold;
      }
      input{
          height: 2rem;
          font-size: 1.5rem;
          background: none;
          border: none;
          outline: none;
          border-bottom: 1px solid black;
      }
      textarea{
          height: 10rem;
          background: none;
          outline: none;
          font-size: 1.5rem;
          resize: none;
          font-family: 'Martian Mono', monospace;
      }
  };
  button{
      height: 2rem;
      width: 7rem;
      background-color: #fcfbff;
      border: none;
      border-radius: 4px;
      font-size: 1.2em;
      display: grid;
      justify-content: center;
      font-family: 'Martian Mono', monospace;
      align-items: center;
      cursor: pointer;  
      justify-self: start;
      align-self: center;
      box-shadow: 0px 15px 35px -5px rgba(50, 88, 130, 0.32);
      transition: background-color 0.3s linear;
      &:hover{
          box-shadow: 0px 15px 35px -5px rgba(23, 53, 87, 0.59);
          background: #1f202a;
          color: white;
          text-shadow: 0px 0px 10px white;
      }

  }
  grid-area: bodyL;
  justify-self: center;
  align-self: center;
  display: grid;
  gap: 20px;
;
`


const AlertBoxContainer = styled.div`
  ${Global.Animations.FadeInBottom}

  display: ${props => props.$display ? "grid" : "none"};
  position: absolute;
  bottom: 0px;
  right: 0px;
  width: 250px;
  background-color: white;
  padding: 10px;
  height: auto;
  border-radius: 10px;
  margin: 10px;
  text-align: center;


    @media only screen and (max-width: 380px) {
    width: calc(100% - 10px);
    padding: 0px;
    margin: 10px;
    }
`



const ContactForm = () => {

  const [validE, setValidE] = useState(false);
  const [validN, setValidN] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");
  const [message, setMessage] = useState("")
  const [display, setDisplay] = useState(false);


  const [info, setInfo] = useState({
    "email" : {
      "from" : "",
      "subject" : "",
      "body" : ""
    }
  })


  const checkName = (e) => {
    setValidN(validName.test(e.target.value));
    if(validN){
      setFullName(e.target.value);
      setInfo({"email" : {...info.email, "subject" : e.target.value}})
    }

  }

  const checkEmail = (e) => {
    setValidE(validEmail.test(e.target.value))
    if(validE){
      setEmail(e.target.value);
      setInfo({"email" : {...info.email, "from" : e.target.value}})
    }
  }

  const timer = () => { 
    console.log("timer is called")
    setTimeout(() => {
      setDisplay(false);
    }, (10000));
  }


  const sendEmail = async() => { 
    const param = {
      ...info
    }
  
  const options = {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(param),
      
  };

  const result = fetch("http://localhost:3000/api/contact/email", options)
  


  }

  const submit = () => {
    console.log(fullName, email)
    console.log(info)
    if(validName.test(fullName) && validEmail.test(email)){
      sendEmail()
      setMessage("Email sent!")
      setDisplay(true);
      timer();
    }else{ 
      setMessage("Please enter a full name with a space and email.")
      setDisplay(true);
      timer();
    }
  }

  return (
      <Contact>
          <div>
              <label>Full Name:</label>
              <input style={{borderBottom: `1px solid ${validN ? 'black' : 'red'}`}} onChange = {checkName}></input>
          </div>
          <div>
              <label >E-mail:</label>
              <input style = {{borderBottom: `1px solid ${validE ? 'black' : 'red'}`}} type="email" onChange = {checkEmail}></input>
          </div>
          <div>
              <label>Message:</label>
              <textarea style = {{border: "1px solid grey", }} onChange={(e) => {setInfo({"email" : {...info.email, body : e.target.value}})}}></textarea>
          </div>
          <div style = {{display: 'grid', alignItems: 'center', justifyContent: 'center', padding: "20px"}}><button onClick={submit}>Submit</button></div>
          <AlertBoxContainer $display = {display}>{message}</AlertBoxContainer>
      </Contact> 
      
  )
}

const ContactInfo = styled.div`
  display: grid;
  grid-area: bodyR;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;   
  >*{
      display: grid;
  }
`
const T = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`

const E = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`

const Social = styled.div`
      display: grid;
      grid-auto-flow: column;
      justify-content: space-evenly;
      align-items: center;
      padding: 15px;

      img{
          user-select: none;
          height: 40px;
          width: 40px;
          border-radius: 10px;
          cursor: pointer;

          &:hover{
              box-shadow: 0px 15px 35px -5px rgba(23, 53, 87, 0.59);
              background: white;
              color: white;
              text-shadow: 0px 0px 10px white;
          }
      }
`

const backBtn = {
  position: "absolute",
  top: "10px",
  left: "10px",
  borderRadius: "5px",
  border: "black 1px solid",
  padding: "5px",
}

export default function About(){

  const dispatch = useDispatch();
  const {id} = useParams();
  useEffect(()=>{
    dispatch(authSlice.actions.checkToken());
    
  },[]);

    return (
        <Page>
            {id != "app" ? <LinkBtn link = "/" text = "Back" style = {backBtn}></LinkBtn> : ""}
            
            <RightWrapper>
                <RightWrapperInner>
                    <div style = {{gridArea: "header", fontSize: '3rem', fontWeight: 'bold', display: 'grid', alignSelf:'center', justifySelf: 'center', borderBottom: '1px solid  #babab6', padding: "20px"}}>  Contact Me </div> 
                    <ContactForm></ContactForm>
                    <ContactInfo>
                        <div>
                            <T>Based in</T>
                            <address>New York</address>
                            <address>United States</address>
                        </div>
                        <div>
                            <E>Contact</E>
                            <div>Chuan Chen</div>
                            <div>chuan.chen.info@gmail.com</div>
                            <div>(917)605-6373</div>
                        </div>
                        <Social >
                            <a href = "https://github.com/Chuan-Chen"><img src ={github} alt = "Github" draggable = "false"></img></a>
                            <a href = "https://www.linkedin.com/in/chuan-chen-496199214/"><img src = {linkedin} alt = "Linkedin" draggable = "false"></img></a>
                            <a href = "https://self.nauhc.dev/"><img src = {portfolio} alt = "Portfolio" draggable = "false"></img></a>
                        </Social>
                        
                    </ContactInfo>
                </RightWrapperInner>
            </RightWrapper>
        </Page>
    )
}