import { useState } from "react"
import styled from "styled-components"


const Page = styled.div`
    height: 100%;
    width: 100%;
    z-index: 10;
    display: ${props => props.$toggle ? "grid" : "none"};
`

const Button = styled.button`
    display: ${props => props.$toggle ? "block" : "none"};
`


export default function DialogScreen({buttonText}){

    const [toggle, setToggle] = useState(false)

    const handleScreenToggle = () => {
        setToggle(!toggle);
    }

    return (
        <>
        <Button onClick={handleScreenToggle} $toggle = {!toggle}>{buttonText}</Button> 
        <Page $toggle = {toggle} onClick={handleScreenToggle}>
            <div>toggle</div>
        </Page>
        </>
    )
}