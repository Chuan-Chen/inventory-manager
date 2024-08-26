import { useState } from "react"
import styled from "styled-components"


const Item = styled.div`


`
const ItemCards = styled.div`
overflow: auto;
border-radius: 5px;
align-self: center;
justify-self: center;
padding: 15px;
height: 90%;
width: 80%;
background-color: lightgrey;
display: grid;
`

const ItemCardsContainer = styled.div`
    display: grid;
    height: 400px;
    width: 300px;
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

export default function ItemCard({ItemName, ItemImage, Username, ItemID, ItemCategory, ItemAmount}){

    const [Item, setItem] = useState({
        "ItemName" : ItemName,
        "ItemImage" : ItemImage,
        "Username" : Username,
        "ItemID" : ItemID,
        "ItemCategory" : [...ItemCategory],
        "ItemAmount" : ItemAmount
    })

    return (
        <ItemCardsContainer onClick={()=>{}}>
            <ItemCards>
                <div>
                <CardSection>
                    <img src = {ItemImage} alt = "ItemImage"/>
                </CardSection>
                <CardSection>   
                    <div>
                        <div>Itemname:</div>
                        <div className = "ItemName">{ItemName}</div>
                    </div>
                </CardSection>
                <CardSection>
                    <div className="ItemAmount">ItemAmount: {ItemAmount}</div>
                </CardSection> 
                </div>
                <div style = {{alignSelf: "end", display: "grid", gridAutoFlow: "row", color: "grey", fontSize: ".6em"}}>
                    <div style = {{justifySelf: "start", display: "grid", gap: "5px", width: "100%", gridTemplateColumns: "repeat(auto-fit, minmax(50px, 1fr))"}} className="ItemCategory">
                        <div style = {{borderRadius: "3px", padding: "2px"}} >Tags:</div> {ItemCategory.map((i, element)=>{
                        return <div style = {{border: "1px solid grey", borderRadius: "3px", padding: "2px", textOverflow: "ellipsis"}} key = {i}>{ItemCategory[element]}</div>
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