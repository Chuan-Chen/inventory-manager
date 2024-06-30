import styled from "styled-components"


const Page = styled.div`

    @keyframes fadeIn {
        0% {
            font-size: 0em;
        }
        100% {
            font-size: 1em;
        }
    }
    animation: 1s ease-in 0s 1 fadeIn;

    display: grid;
    height: 100%;
    width: 100%;
    align-items: center;
    justify-content: center;
    background-color: #e8e9f3;
    transition: font-size 4em;
`



export default function Error({errorcode}){
    return (
        <Page>
            <div>
                Error: {errorcode}
            </div>
        </Page>
    )
}