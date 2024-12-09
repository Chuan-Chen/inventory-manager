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
import close from "../../assets/close.svg";
import edit from "../../assets/edit.svg";
import Dashboard from "./Dashboard.jsx"

const Page = styled.div`
    ${Global.Animations.SlideInTop}
    height: 100%;
    width: 100%;
    display: grid;
`

//  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
const ProfileContainer = styled.div`
  z-index: 2;
  position: absolute;
  align-self: center;
  justify-self: center;
  height: 80%;
  width: 80%;
  border-radius: 10px;

  display: grid;
  grid-template-areas: 
  "profile stats1 stats1"
  "profile stats2 stats2";
  gap: 15px;
  @media(max-width: 800px){
    height: 100%;
    width: 100%;
    border-radius: 0px;
    background-color: #e8e9f3;

    grid-template-areas: 
    "profile";
  }


`

const ProfileSection = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  background-color: ${Global.Styles.BackgroundColor};
  display: grid;
  border-radius: 10px;
  grid-area: profile;
  position: relative;
  width: 100%;
  height: 100%;
  min-width: 300px;
`

const ProfilePicture = styled.img`
  border-radius: 50%;
  border: 0px solid white;
  background-color: white;
  object-fit: cover;
  width: 200px;
  height: 200px;
  align-self: center;
  justify-self: center;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);s
`

const EditButton = styled.button`
    padding: 0px;
    position: absolute;
    background: none;
    display: ${props => !props.$toggle ? "block" : "none"};
    width: 200px;
    height: 200px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    font-weight: bolder;
    
    &:hover{
      backdrop-filter: blur(3px);
    }
    &:active{
      backdrop-filter: blur(3px);
    }
`
const CancelBtn = styled.img`
  width: fit-content;
  grid-area: btn;
  height: fit-content;
  padding: 0px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
      &:hover{
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
`

//use z-index to flip thru pages
const UserStats = styled.div`
  background-color: ${Global.Styles.BackgroundColor};
  z-index: 1;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  height: 100%;
  width: 100%;
  position: relative;
  grid-area: stats1;
  border-radius: 10px;
    @media(max-width: 800px){
    display: none;
    grid-area: none;
  }
`

const GlobalStats = styled.div`
  background-color: ${Global.Styles.BackgroundColor};
  z-index: 1;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  height: 100%;
  width: 100%;
  position: relative;
  grid-area: stats2;
  border-radius: 10px;
    @media(max-width: 800px){
    display: none;
    grid-area: none;
  }
`


/**
     &:hover{
      backdrop-filter: blur(10px);
    }
 */

export default function Profile(){

    const user = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const [displayPFPuploader, setDisplayPFPuploader] = useState(false);


    const [imageURL, setimageURL] = useState({
      "status" : "pending",
      "url" : ""
    });


    const uploadHandler = () => {
      setDisplayPFPuploader(!displayPFPuploader);
    }

    const handleImage = (status, url) => {
      setimageURL({"status" : status, "url" : url});
      localStorage.setItem("ProfilePicture", `${url}`)
      console.log(status, url)
      if(status == "fulfilled"){
        uploadHandler();
        dispatch(authSlice.actions.updateUser(url));
      }

    }



    useEffect(()=>{
      dispatch(authSlice.actions.checkToken());
      
      //dispatch(authSlice.actions.updateUser());
    });

    //<div>welcome! {user.user.FirstName || JSON.parse(localStorage.getItem('user')).FirstName} <br></br> Email: {JSON.parse(localStorage.getItem('user')).Email}</div>
    


    return (
        <Page>
            <div style = {{background: "linear-gradient(45deg, #c9d6df, #cbc5ea)", height: "40%", width: "100%", zIndex: '-1'}}></div>
            <ProfileContainer>
            <ProfileSection>
            <div style = {{alignSelf: "center", justifySelf: "center"}}>
              <div style = {{height: "100%", width: "100%", position: "relative"}}>
                  <EditButton onClick={uploadHandler} $toggle = {displayPFPuploader}></EditButton>
                  <img src = {edit} style = {{position: "absolute", borderRadius: "50%", backgroundColor: "#cbc5ea", padding: "5px", bottom: "12px", right: "12px", border: "2px solid lightgrey", display: displayPFPuploader == false ? "block" : "none"}}></img>
                  <div style = {{position: "absolute",gap: "10px", display: displayPFPuploader == true ? "flex" : "none",flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", width: "100%", borderRadius: "50%", backdropFilter: displayPFPuploader == true ? "blur(5px)" : "none", overflow: 'hidden'}}>
                    <CancelBtn onClick={()=>{setDisplayPFPuploader(!displayPFPuploader)}} src = {close}></CancelBtn>
                    <FileUpload imageStatus = {imageURL.status} imageURL = {imageURL.url} handleImage={handleImage} style = {{gridArea: "upload"}}>
                    </FileUpload>
                  </div>

                  <ProfilePicture src = {localStorage.getItem("ProfilePicture")}>
                  </ProfilePicture>
              </div>
            </div>
            <div style = {{display: "grid", justifyContent: "center"}}>
              <div style = {{borderTop: "1px solid grey", width: "100%", minWidth: "250px"}}>{user.user.FirstName} {user.user.LastName}</div>
              <div style = {{borderTop: "1px solid grey", width: "100%"}}>Email: {JSON.parse(localStorage.getItem('user')).Email}</div>
            </div>
            </ProfileSection>
            <GlobalStats>
            </GlobalStats>
            <UserStats>
            </UserStats>
            </ProfileContainer>
        </Page>
    )
}