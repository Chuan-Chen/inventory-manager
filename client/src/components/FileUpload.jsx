import { useState } from "react"
import styled from "styled-components"
import fulfilled from "../assets/checkmark.svg";
import pending from "../assets/pending.svg";
import rejected from "../assets/failed.svg"


const Container = styled.div`
    height: 40px;
    width: fit-content;
    align-self: center;
    justify-self: center;
    
`

const Label = styled.label`
    display: grid;
    cursor: pointer;
    background-color: lightgray;
    border-radius: 10px;
    width: 100%;
    height: 100%;
    align-self: center;
    justify-self: center;

    :hover{
        transition: .3s;
        background-color: darkgray;
        border-radius: 10px;
    }
`

const upload = async (file) => {
    const form = new FormData();
    form.append('image', file);
    
    //console.log(form);
    const options = {
        method: "POST",
        body: form
    };

    console.log(options)

    const response = await fetch("http://localhost:3000/api/image/upload", options);
    const data = await response.json();
    console.log(data);
    return data;
    
}

export default function FileUpload({handleImage, imageStatus, imageURL, buttonText}){

    const [fileName, setfileName] = useState(buttonText ? buttonText : "Upload a File");
    const HandleFile = (e) => {
        let value = (e.target.value).split("\\");
        setfileName(value[value.length-1] ? value[value.length-1] : "Upload File");
        if(e.target.files[0]){
            upload(e.target.files[0])
            .then((data) => handleImage("fulfilled", data.result))
            .catch(handleImage("rejected", ""));
        }else{
            handleImage("pending", "");
        }
        
    }
    return (
        <Container>
            <form style = {{height: "100%", width: "100%", display: "grid", gridAutoFlow: "column", alignItems: "center", justifyContent: "center", gap: "10px"}}>
                <Label htmlFor="file-upload">
                    <div style = {{padding: "10px"}}>
                    {fileName}
                    </div>
                </Label>
                <input id = "file-upload" style = {{display: "none"}} type = "file" accept="image/png, image/jpeg" onChange={HandleFile}></input>
                <img src = {(()=>{
                    if(imageStatus === "fulfilled"){
                        return fulfilled;
                    }else if(imageStatus === "pending"){
                        return pending;
                    }else{
                        return rejected;
                    }
                })()} height = "20px" alt = "status"></img>
                
            </form>
        </Container>
    )
}