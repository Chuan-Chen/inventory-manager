import { useState } from "react"
import styled from "styled-components"

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

export default function FileUpload({setimageURL}){

    const [fileName, setfileName] = useState("Upload a File");

    const HandleFile = (e) => {
        let value = (e.target.value).split("\\");
        setfileName(value[value.length-1] ? value[value.length-1] : "Upload File");
        upload(e.target.files[0])
    }
    return (
        <Container>
            <form style = {{height: "100%", width: "100%"}}>
                <Label htmlFor="file-upload">
                    <div style = {{padding: "10px"}}>
                    {fileName}
                    </div>
                </Label>
                <input id = "file-upload" style = {{display: "none"}} type = "file" accept="image/png, image/jpeg" onChange={HandleFile}></input>
            </form>
        </Container>
    )
}