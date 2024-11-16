import styled from "styled-components"
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { authSlice } from "../features/authSlice.js"
import { useDispatch } from "react-redux";
import FileUpload from "./FileUpload.jsx";

const Page = styled.div`
height: 100%;
width: 100%;
display: grid;
align-items: center;
justify-content: center;

`
/*
  @media(max-width: 800px){

    background-color: #e8e9f3;
  }

*/
const CloseButton = styled.button`
`

const SaveButton = styled.button`
  background: none;
  border-radius: 4px;
  border: 1px solid black;
  padding: 5px;
  font-weight: bold;
  cursor: pointer;
`

function saveFunc(){
    
}


export default function EditProfile({handleScreenToggle}){

    const user = useSelector(state => state.auth);
    const dispatch = useDispatch();



    const [imageURL, setimageURL] = useState({
      "status" : "pending",
      "url" : ""
    });

    const handleImage = (status, url) => {
        setimageURL({"status" : status, "url" : url})
      }

    return (
      <Page>
        
        <CloseButton onClick={handleScreenToggle}>x</CloseButton>

          <CloseButton onClick={handleScreenToggle}>Back</CloseButton>
          <FileUpload imageStatus = {imageURL.status} imageURL = {imageURL.url} handleImage={handleImage}>
          </FileUpload>
          <div>
          <div>First: {user.user.FirstName}</div>
          <div>Last: {user.user.LastName}</div>
          </div>
          
          <SaveButton onClick={()=>{
                  handleScreenToggle();
                  saveFunc();
                  }}>
                      Save
        </SaveButton>
        
      </Page>
  )
}