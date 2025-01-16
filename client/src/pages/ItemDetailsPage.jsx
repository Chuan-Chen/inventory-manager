import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Global from "../styles/Global";
import API from "../features/api";
import ItemCard from "../components/ItemCard";

const Page = styled.div`
    height: 100%;
    width: 100%;
    background-color: ${Global.Styles.BackgroundColor};
    display: grid;
`
const Container = styled.div`
    height: 90%;
    width: 90%;
    display: grid;
    border-radius: 10px;
    place-self: center;
    background-color: lightgrey;
    grid-template-areas:
    "img img side side"
    "img img side side"
`

const ItemImage = styled.img`
    place-self: center;
    width: 300px;
    height: 400px;
    border: none;
    outline: none;
    grid-area: img;
`

const ContainerSide = styled.div`
    place-self: center;
    height: 100%;
    width: 100%;
    grid-area: side;
`

export default function ItemDetails(){
    const {id} = useParams();
    const [itemDetails, setItemDetails] = useState([]);
    const [loadstatus, setLoadstatus] = useState(false);

    useEffect(()=>{
        getItemDetails();
    }, [])

    const getItemDetails = async() => {
        const param = {
            ItemBarcode: id,
        }
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(param),
        }
        const url = API.SERVER + "/api/item/read/barcode"
        const items = await fetch(url, options);
        const parsedData = await items.json();
        setItemDetails(parsedData.result);
        setLoadstatus(true);
        console.log(parsedData)
}

    return (
        <Page>
            
            {loadstatus ? 
            <Container>
                <ItemImage src = {itemDetails.ItemImage}></ItemImage>
                <ContainerSide>some stuff</ContainerSide>
            </Container>
            : "loading"}
            </Page>
    )

}


