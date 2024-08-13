import { useState } from "react"
import styled from "styled-components"

const Container = styled.div`
    height: 40px;
    width: fit-content;

`

const Label = styled.label`
    display: grid;
    cursor: pointer;
    background-color: lightgray;
    border-radius: 10px;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;

    :hover{
        transition: .3s;
        background-color: darkgray;
        border-radius: 10px;
    }
`

export default function FileUpload(){

    const [fileName, setfileName] = useState("Upload a File");

    const HandleFile = (e) => {
        let value = (e.target.value).split("\\");
        setfileName(value[value.length-1] ? value[value.length-1] : "Upload File");
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