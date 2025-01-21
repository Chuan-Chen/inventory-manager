import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Global from "../styles/Global";
import API from "../features/api";
import ItemCard from "../components/ItemCard";
import Details from "../components/Details";
import { authSlice } from "../features/authSlice";
import { useDispatch, useSelector } from "react-redux";


const Page = styled.div`
    height: 100%;
    width: 100%;
    background-color: ${Global.Styles.BackgroundColor};
    display: grid;

`



export default function ItemDetails(){
    const {id} = useParams();
    const [itemDetails, setItemDetails] = useState([]);
    const [loadstatus, setLoadstatus] = useState(false);
    const dispatch = useDispatch();
    //const user = useSelector(state => state.auth);


    useEffect(()=>{
        getItemDetails();
        dispatch(authSlice.actions.checkToken())
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
            <Details object={itemDetails}></Details>
            : "...loading"}
        </Page>
    )

}


