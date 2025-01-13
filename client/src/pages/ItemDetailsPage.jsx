import styled from "styled-components";
import JsBarcode from "jsbarcode"
import { useEffect } from "react";
import { useParams } from "react-router-dom";


const Page = styled.div`
    height: 100%;
    width: 100%;

`


export default function ItemDetails(){
    const {id} = useParams();

    useEffect(()=>{
                JsBarcode(`#test`, "google.com", {
                    height: 30,
                    background: "",
                    format: "CODE128",
                    displayValue: false
                });
    })



    return (
        <Page>
            <div id="#test"></div>
            {window.location.href + id}
        </Page>
    )

}