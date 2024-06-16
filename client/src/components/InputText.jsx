import styled from "styled-components";
const text = {
    border: "none",
    boxShadow: "0 0 2px black",
    padding: "8px",
    borderRadius: "5px",
}

const inputT = styled.input`
    border: none;
    box-shadow: 0 0 2px black;
    padding: 8px; 
    borderRadius: 5px; 
    &:active{
        border: none;
    }
`

function InputText({placeholder, style, onChange}){
    return (
        <input placeholder = {placeholder} style = {{...style, ...text}} onChange={onChange}></input>
    )
}


export default InputText;