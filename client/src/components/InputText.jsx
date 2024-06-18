import styled from "styled-components";
const text = {
    border: "none",
    boxShadow: "0 0 2px black",
    padding: "8px",
    borderRadius: "5px",
}

const inputT = styled.input`
    border: none;
    
    padding: 8px; 
    borderRadius: 5px; 
    &:active{
        border: none;
    }
`

function InputText({placeholder, style, onChange, type}){
    return (
        <input placeholder = {placeholder} style = {{...text, ...style}} type = {type} onChange={onChange}></input>
    )
}


export default InputText;