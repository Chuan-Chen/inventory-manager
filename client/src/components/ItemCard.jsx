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
                    <div>
                        <div>Username:</div>
                        <div>{Username}</div>
                    </div>
                </CardSection>
                <CardSection>
                    <div>
                        <div>ItemID:</div>
                        
                    </div>
                </CardSection>
                <CardSection>
                    <div className="ItemAmount" >ItemAmount: {ItemAmount}</div>
                </CardSection> 
                </div>
                
                <div style = {{alignSelf: "end", display: "grid", gridAutoFlow: "row", color: "grey", fontSize: ".6em", }}>
                    <div style = {{justifySelf: "start", display: "grid", gridAutoFlow: "column", gap: "5px", overflow: "scroll", width: "90%", overflowY: "hidden"}} className="ItemCategory">Tags: {ItemCategory.map((i, element)=>{
                        return <div style = {{border: "1px solid grey", borderRadius: "3px", padding: "2px"}} key = {i}>{ItemCategory[element]}</div>
                    })}</div>
                    <div style = {{justifySelf: "end"}}>ItemID: {ItemID}</div>
                </div>
            </ItemCards>
        </ItemCardsContainer>
    )
}