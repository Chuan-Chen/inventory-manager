import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components"
import Global from "../styles/Global";

const Variables = {
    pagecolor: "#e8e9f3",
    itemcardcolor: "",
}

const Page = styled.div`
    height: 100%;
    width: 100%;
    background-color: ${Variables.pagecolor};
    display: grid;
    align-items: center;
    justify-content: center;

`

const Cards = styled.div`
    background-color: ${Variables.itemcardcolor};
    width: 300px;
    height: 200px;
    border-radius: 5px;
    box-shadow: 0 0 10px grey;
`

const CardsInner = styled.div`
    margin: 10px;
    height: calc(100% - 20px);
    width: calc(100% - 20px);
    display: grid;
`

const Loading = styled.div`
    ${Global.Animations.JelloHorizontal}
    height: fit-content;
    width: fit-content;
    background-color: #b7b8c0;
    
    border-radius: 5px;
    padding: 10px;
`

function ItemCards({ItemName, ItemDescription, Username, ItemBarcode, ItemCategory, ItemID}){
    return (
        <Cards>
            <CardsInner>
                <div>{ItemName}</div>
                <div>{ItemDescription}</div>
                <div>{Username}</div>
                <div>{ItemBarcode}</div>
                <div>{ItemCategory}</div>
                <div>{ItemID}</div>
            </CardsInner>
        </Cards>
    )
}

export default function Products(){
    const [status, setStatus] = useState(false);
    const [items, setItems] = useState([]);
    const {user} = useParams();

    const fetchItem = async () => {
        const items = fetch("http://localhost:3000/api/item/read").then(res => res.json())
        console.log(await items)
        return items;
    }

    useEffect(()=> {
        fetchItem()
        .then((data) => {setItems([data.result]); setStatus(true)});
    }, []);

    return (
        <Page>
            {status ? items.map((element, index) => {
                return <ItemCards key = {index}>{element.ItemID}</ItemCards>
            }) : (<Loading>Loading...</Loading>)}
        </Page>
    )
}