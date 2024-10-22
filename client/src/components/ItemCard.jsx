import JsBarcode from "jsbarcode"
import { useState, useEffect } from "react"
import styled from "styled-components"


const Item = styled.div`


`
const ItemCards = styled.div`
overflow: auto;
border-radius: 5px;
align-self: center;
justify-self: center;

height: 95%;
width: 90%;

display: grid;
overflow-x: hidden;

`

const ItemCardsContainer = styled.div`
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    display: grid;
    height: 400px;
    background-color: #e5e4e2;
    border-radius: 10px;
    width: 100%;
    max-width: 300px;
    align-self: center;
    justify-self: center;
`


const Button = styled.button`
    display: grid;
    height: 20px;
    width: 20px;

`


const CardSection = styled.div`
    > div:first-of-type{
        display: grid;
        grid-auto-flow: column;
    }
`

const EditField = styled.input`
    display: ${props => props.$display ? "absolute" : "none"};
    z-index: 2;

`

const SaveButton = styled.button`
    display: ${props => props.$display ? "absolute" : "none"};
    height: fit-content;
    width: fit-content;

`

export default function ItemCard({ItemName, ItemImage, Username, ItemID, ItemCategory, ItemAmount, ItemBarcode}){

    const [date, setDate] = useState("some");

    const [Item, setItem] = useState({
        "ItemName" : ItemName,
        "ItemImage" : ItemImage,
        "Username" : Username,
        "ItemID" : ItemID,
        "ItemCategory" : [...ItemCategory],
        "ItemAmount" : ItemAmount
    })

    useEffect(()=>{
        JsBarcode(`#${date+ItemID}`, ItemBarcode, {
            height: 30,
            background: ""    
        });
    });

    return (
        <ItemCardsContainer onClick={()=>{}}>
            <ItemCards>
                <div style = {{display: "grid", gap: "10px"}}>
                <CardSection style = {{display: "grid"}}>
                    <img style ={{alignSelf: "center", justifySelf: "center", borderRadius: "5px", minHeight: "150px", maxHeight: "170px", height: "100%", width: "100%", objectFit: "cover"}} src = {ItemImage} alt = "ItemImage"/>
                </CardSection>
                <CardSection>   
                    <div>
                        <div className = "ItemName">{ItemName}</div>
                    </div>
                </CardSection>
                <CardSection>
                    <div className="ItemAmount">Quantity: {ItemAmount}</div>
                </CardSection> 
                <CardSection style = {{display: "grid"}}>
                    <img id={date+ItemID} style = {{alignSelf: "center", justifySelf: "center"}} alt = {ItemBarcode}></img>
                </CardSection>
                </div>
                <div style = {{alignSelf: "end", display: "grid", gridAutoFlow: "row", color: "grey", fontSize: ".6em"}}>
                    <div style = {{justifySelf: "start", display: "grid", gap: "5px", width: "100%", gridTemplateColumns: "repeat(auto-fit, minmax(50px, 1fr))", maxHeight: "2em", overflowY: "hidden", textOverflow: "ellipsis"}} className="ItemCategory">
                        <div style = {{borderRadius: "3px", padding: "2px"}} >Tags:</div> {ItemCategory.map((element, index)=>{
                        return <div style = {{border: "1px solid grey", borderRadius: "3px", padding: "2px", overflow: "hidden"}} key = {index}>{ItemCategory[index]}</div>
                    })}</div>
                    <div style = {{display: "grid", gridAutoFlow: "column"}}>
                    <div style = {{justifySelf: "start"}}>ItemID: {ItemID}</div>
                    <div style = {{justifySelf: "end"}}>Username: {Username}</div>
                    </div>
                    
                </div>
            </ItemCards>
        </ItemCardsContainer>
    )
}