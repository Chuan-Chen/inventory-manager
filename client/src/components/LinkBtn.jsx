import {Link} from "react-router-dom";
import styled from "styled-components";

const Btn = styled(Link)`
    font-size: .9em;
    text-decoration: none;
    color: inherit;
    user-select: none;
    &:hover {
        box-shadow: 0 0 5px gray;
    }
`

function LinkBtn({link, text, style, onClick}){
    // <Link style={{...style, ...btnStyle}} to = {link}>{text}</Link>
    return (
       <Btn style = {{...style}} to = {link} onClick = {onClick}>{text}</Btn>
    )
}

export default LinkBtn;