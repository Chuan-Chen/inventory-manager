import { useEffect, useState } from "react"
import styled from "styled-components"

const Image = styled.img`
    height: auto;
    width: 90%;
    max-width: 50vh;
    justify-self: center;

    object-fit: contain;
    box-shadow: 0px 15px 35px -5px rgba(50, 88, 130, 0.32);
    border-radius: 5px;
    user-select: none;
    grid-area: image;
    margin: 2vh;
    @media(max-width: 800px){
        max-height: 50vh;

        width: 90%;
        overflow: hidden;
    }
    
`

const Page = styled.div`
    height: 86.5vh;
    width: 100%;
    
    display: ${props => props.isDisplayed ? "block" : "none"};
    @media(max-width: 800px){
        height: 100%;
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
    height: 100%;
    margin-left: 15%;
    margin-right: 15%;
    gap: 10%;
    grid-template-areas:
    "image image image wrapper wrapper" 
    "image image image wrapper wrapper"
    "image image image wrapper wrapper"
    "image image image wrapper wrapper";

    @media(max-width: 800px){
        margin: 0px;
        grid-template-areas:
        "image image image"
        "image image image"
        "image image image"
        "wrapper wrapper wrapper"
        "wrapper wrapper wrapper"
        "wrapper wrapper wrapper";
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
    grid-area: rating;
    height: 30px;
    user-select: none;
    font-weight: bold;
`

const ButtonArea = styled.div`
    grid-area: shopbtn;
    display: flex;
    gap: 20px;
    
`

const WrapperRight = styled.div`
    display: grid;
    grid-area: wrapper;
    margin: 20px;
    
    grid-template-areas: 
    "header header"
    "rating rating"
    "price price"
    "shopbtn shopbtn"
    "detail detail"
    "detail detail"
    "detail detail";
    @media(max-width: 800px){
        gap: 40px;
    }

`
export default function Details({isDisplayed, clickHandler, object}){
    

    

    useEffect(()=>{

    }, []);


    
    //addItem([title, price, image, 1])
    return (
        <Page isDisplayed={isDisplayed}>
            <Container>
                <Image src = {object.ItemImage} draggable = "false"/>
                <WrapperRight>
                <Title>{object.ItemName}</Title>
                
                <Price><div style = {{position: 'relative', top: '-3px'}}>Price:</div>${object.price}</Price>
                <Detail><div>Product Details: </div>{object.description}</Detail>

                
                <Reviews>
                    <div style = {{textDecoration: 'underline', cursor: 'pointer'}}>{rating}</div>
                    <div style = {{width: '100px', position: "relative",top: '-2px'}}>
                    <StarContainer>
                        <img alt = ""/><img alt = ""/><img alt = ""/><img alt = ""/><img alt = ""/>
                    </StarContainer>
                    </div>
                    
                    <div title = "Customer Reviews" style = {{textDecoration: 'underline', cursor: 'pointer', userSelect: 'none'}}>{rateCount}</div>
                </Reviews>

                <ButtonArea>
                    <Button onClick={()=>{addItem([object.title, object.price, object.image, 1])}}>+</Button>
                    <Button onClick={()=>{subItem([object.title, object.price, object.image, 1])}}>-</Button>
                </ButtonArea>
                </WrapperRight>
                </Container>    
        </Page>
    )
}