import {Link} from "react-router-dom";
import styled from "styled-components";

const Btn = styled(Link)`
    text-decoration: none;
    color: inherit;
    user-select: none;
    &:hover {
        box-shadow: 0 0 5px gray;
    }
`

function LinkBtn({link, text, style}){
    // <Link style={{...style, ...btnStyle}} to = {link}>{text}</Link>
    return (
       <Btn style = {{...style}} to = {link}>{text}</Btn>
    )
}

export default LinkBtn;