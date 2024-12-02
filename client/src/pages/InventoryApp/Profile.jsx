import styled from "styled-components"
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { authSlice } from "../../features/authSlice";
import { useDispatch } from "react-redux";
import FileUpload from "../../components/FileUpload";
import { updateUser } from "../../components/AuthFunctions.jsx";
import DialogScreen from "../../components/DialogScreen.jsx";
import EditProfile from "../../components/EditProfile.jsx";
import Global from "../../styles/Global.jsx";

const Page = styled.div`
    ${Global.Animations.SlideInTop}
    height: 100%;
    width: 100%;
    display: grid;
`

const ProfileCard = styled.div`
  z-index: 2;
  position: absolute;
  align-self: center;
  justify-self: center;
  height: 70%;
  width: 50%;
  background-color: #f3f3ff;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  display: grid;

  @media(max-width: 800px){
    height: 100%;
    width: 100%;
    border-radius: 0px;
    background-color: #e8e9f3;
  }


`

const ProfilePicture = styled.img`
  border-radius: 100%;
  border: 0px solid white;
  background-color: white;
  width: 200px;
  height: 200px;
  align-self: center;
  justify-self: center;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);s
`

const EditButton = styled.button`
    position: absolute;
    width: fit-content;
    height: fit-content;
    display: ${props => !props.$toggle ? "block" : "none"};

`

/**
     &:hover{
      backdrop-filter: blur(10px);
    }
 */

export default function Profile(){

    const user = useSelector(state => state.auth);
    const dispatch = useDispatch();



    const [imageURL, setimageURL] = useState({
      "status" : "pending",
      "url" : ""
    });



    const ImageHandler = () =>{
      updateUser(user.user.Username, user.user.Email, user.user.FirstName, user.user.LastName, imageURL.url);
    }

    useEffect(()=>{
      dispatch(authSlice.actions.checkToken());
      
      //dispatch(authSlice.actions.updateUser());
    },[]);

    //<div>welcome! {user.user.FirstName || JSON.parse(localStorage.getItem('user')).FirstName} <br></br> Email: {JSON.parse(localStorage.getItem('user')).Email}</div>

    return (
        <Page>
            <div style = {{backgroundColor: "#b7b8c0", height: "40%", width: "100%"}}></div>


            <ProfileCard>
            <div style = {{alignSelf: "center", justifySelf: "center"}}>

            <div style = {{height: "100%", width: "100%"}}>
            <DialogScreen Button = {<EditButton>Edit</EditButton>}>
              <EditProfile></EditProfile>
            </DialogScreen>
            <ProfilePicture src = {user.user.ProfilePicture}>
            </ProfilePicture>
            </div>

            </div>

            
            <div style = {{display: "grid", justifyContent: "center"}}>
              <div>Name: {user.user.FirstName}</div>
              <div>Email: {JSON.parse(localStorage.getItem('user')).Email}</div>
            </div>
            
            </ProfileCard>
        </Page>
    )
}