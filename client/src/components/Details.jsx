import { useEffect, useState } from "react"
import styled from "styled-components"
import Logo from "../assets/logo.svg";

const Image = styled.img`
    height: auto;
    width: 90%;
    max-width: 40vh;
    place-self: center;
    object-fit: contain;
    box-shadow: 0px 15px 35px -5px rgba(50, 88, 130, 0.32);
    border-radius: 5px;
    user-select: none;
    grid-area: image;
    
    @media(max-width: 800px){
        max-height: 50vh;
        width: 90%;
        overflow: hidden;
    }
    
`

const Page = styled.div`
    height: 100vh;

    width: 100%;
    min-width: 100vw;
    display: grid;
    grid-auto-rows: .8fr 11fr;
    @media(max-width: 800px){
        height: 100vh;
        border-radius: none;
    }

`



const BackBtn = styled.button`
    display: flex;
    height: 2rem;
    align-items: center;
    gap: 10px;
    background: none;
    outline: none;
    border: none;
    cursor: pointer;
    user-select: none;
    text-decoration: underline;
    
    img{
        height: 1rem;
    }
`

const Button = styled.div`
    width: 100%;
    height: 40px;
    color: white;
    background-color: #1e1e1e;    
    user-select: none;
    cursor: pointer;
    display: grid;
    justify-items: center;
    align-items: center;
    border-radius: 4px;
    font-size: 2rem;
    transition: background-color 0.3s linear;
    &:hover{
        box-shadow: 0px 15px 35px -5px rgba(23, 53, 87, 0.59);
        background: white;
        color: black;
        text-shadow: 0px 0px 10px white;
    }
`

const Container = styled.div`
    display: grid;
    align-self: center;
    height: 80%;
    margin-left: 15%;
    margin-right: 15%;
    transition: all .2s ease-out;
    grid-template-areas:
    "image image wrapper wrapper wrapper" 
    "image image wrapper wrapper wrapper"
    "image image wrapper wrapper wrapper"
    "image image wrapper wrapper wrapper"
    "bwrapper bwrapper bwrapper bwrapper bwrapper";
          box-shadow: 0px 15px 35px -5px rgba(23, 53, 87, 0.59);
          background: #1f202a;
          color: white;
          text-shadow: 0px 0px 10px white;
          border-radius: 10px;
    @media(max-width: 800px){
        height: 100%;
        margin: 0px;
        border-radius: 0px;
        grid-template-areas:
        "image image image"
        "image image image"
        "image image image"
        "wrapper wrapper wrapper"
        "wrapper wrapper wrapper"
        "wrapper wrapper wrapper"
        "bwrapper bwrapper bwrapper";
    }

`

const Title = styled.div`
    grid-area: header;
    display: grid;
    font-weight: bold;
    font-size: 2.5rem;
    align-self: center;
    justify-self: center;

    border-bottom: 1px solid grey;
`

const Price = styled.div`
    grid-area: price;
    display: flex;
    
    div{
        font-size: 1.05rem;
        font-weight: bold;
        position: relative;
        top: -2px;
    }
`
const Detail = styled.div`
    grid-area: detail;
    display: flex;
    flex-direction: column;
    gap: 10px;
    div{
        font-weight: bold;
        font-size: 1.05rem;
    }
`
const Reviews = styled.div`
    display: flex;
    gap: 10px;
    position: aboslute;
    bottom: 0px;
    height: 30px;
    user-select: none;
    font-weight: bold;
    
`


const WrapperRight = styled.div`
    display: grid;
    grid-area: wrapper;
    width: 90%;
    position: relative;
    grid-template-areas: 
    "header header"
    "rating rating"
    "price price"
    "detail detail"
    "detail detail"
    "detail detail";
    @media(max-width: 800px){
        justify-self: center;
        gap: 40px;
        width: 90%;
    }

`

const ViewContainer = styled.div`
    justify-self: end;
    display: flex;
    flex-direction: column;
`

const BottomWrapper = styled.div`
    color: white;
    font-size: .6em;
    place-self: center;
    display: grid;
    position: relative;
    width: 95%;
    grid-area: bwrapper;
    align-items: end;
    grid-auto-flow: column;
`

const Header = styled.div`
    background-color: #1f202a;
    display: grid;
    grid-auto-flow: column;
    box-shadow: 0px 15px 35px -5px rgba(23, 53, 87, 0.59);
    color: white;
    text-shadow: 0px 0px 10px white;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    @media(max-width: 800px){
        height: 100%;
        border-bottom-left-radius: 0px;
        border-bottom-right-radius: 0px;
        box-shadow: none;
    }
`

export default function Details({object}){
    
    const [ItemDetails, setItemDetails] = useState(object[0]);    

    useEffect(()=>{
        console.log(ItemDetails)
    }, []);


    
    //addItem([title, price, image, 1])
    return (
        <Page>
            <Header>
                <div style = {{height: "100%", display: "flex", fontWeight: "bolder", transition: "all .3s ease-out"}}>
                    <img src = {Logo} style = {{alignSelf: "center", height: "90%", filter: "invert(99%) sepia(70%) saturate(280%) hue-rotate(263deg) brightness(114%) contrast(101%)"}}></img>
                    <div style = {{fontSize: "2rem", alignSelf: "center"}}>Shelfy</div>
                </div>
                <div>
                    <img src = {""}></img>
                </div>
            </Header>
            <Container>
                <Image src = {ItemDetails.ItemImage} draggable = "false"/>
                <WrapperRight>
                <Title>{ItemDetails.ItemName}</Title>
                <Detail><div>Product Details: </div>{ItemDetails.ItemDescription}</Detail>
                </WrapperRight>
                <BottomWrapper>
                <div style = {{justifySelf: "start", display: "flex", gap: "5px", width: "100%", gridTemplateColumns: "repeat(auto-fit, minmax(50px, 1fr))", maxHeight: "2em", overflowY: "hidden", textOverflow: "ellipsis"}} className="ItemCategory">
                        <div style = {{borderRadius: "3px", padding: "2px"}} >Tags:</div> {ItemDetails.ItemCategory.map((element, index)=>{
                        return <div style = {{border: "1px solid grey", borderRadius: "3px", padding: "2px", overflow: "hidden"}} key = {index}>{ItemDetails.ItemCategory[index]}</div>
                    })}</div>
                <ViewContainer>
                    <div>Views: {ItemDetails.Views}</div>
                    <div>ID: {ItemDetails.ItemID}</div>
                </ViewContainer>
                </BottomWrapper>
            </Container>    
        </Page>
    )
}