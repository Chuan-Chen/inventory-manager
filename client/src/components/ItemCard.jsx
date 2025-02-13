import JsBarcode from "jsbarcode"
import { useState, useEffect, useRef } from "react"
import styled from "styled-components"
import { QRCode } from 'react-qrcode-logo';
import Logo from "../assets/logo.svg"
import Delete from "../assets/delete.svg"
import authStore from "../features/authSlice";
import { getItems } from "../features/authSlice";
import API from "../features/api";

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
transition: all .5s ease-out;
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
    transition: all .5s ease-out;
    position: relative;
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


const ViewDetailsBtn = styled.a`
    text-decoration: none;
    color: black;
    &:visited{
        color: inherit
    }
        background-color: #fcfbff;
      border: none;
      border-radius: 4px;
      font-size: .9em;
      display: grid;
      justify-content: center;
      font-family: 'Martian Mono', monospace;
      align-items: center;
      cursor: pointer;  
      align-self: center;
      box-shadow: 0px 15px 35px -5px rgba(50, 88, 130, 0.32);
      transition: background-color 0.3s linear;
      &:hover{
          box-shadow: 0px 15px 35px -5px rgba(23, 53, 87, 0.59);
          background: #1f202a;
          color: white;
          text-shadow: 0px 0px 10px white;
      }

`

const QRcodeBtn = styled.button`
    background-color: #fcfbff;
      border: none;
      border-radius: 4px;
      font-size: .9em;
      display: grid;
      justify-content: center;
      font-family: 'Martian Mono', monospace;
      align-items: center;
      cursor: pointer;  
      align-self: center;
      box-shadow: 0px 15px 35px -5px rgba(50, 88, 130, 0.32);
      transition: background-color 0.3s linear;
      &:hover{
          box-shadow: 0px 15px 35px -5px rgba(23, 53, 87, 0.59);
          background: #1f202a;
          color: white;
          text-shadow: 0px 0px 10px white;
      }
`

const DeleteBtn = styled.div`
    position: absolute;
    height: 20px;
    width: 20px;
    border-radius: 4px;
    top: 5px;
    right: 5px;
    display: grid;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &:hover{
        
    }
`



export default function ItemCard({ItemName, ItemImage, Username, ItemID, ItemCategory, ItemAmount, ItemBarcode, LastName, Email, PopupHandler}){

    const [date, setDate] = useState("tag");
    const qrcoderef = useRef(null);
    const [Item, setItem] = useState({
        "ItemName" : ItemName,
        "ItemImage" : ItemImage,
        "Username" : Username,
        "ItemID" : ItemID,
        "ItemCategory" : [...ItemCategory],
        "ItemAmount" : ItemAmount
    })

    const [qrcode, setQrcode] = useState((window.location.href + "/" + ItemBarcode).replace("/app/inventory", "/item")) 

    const [qrdisplay, setQrdisplay] = useState(false);

    useEffect(()=>{
        /** 
        JsBarcode(`#${date+ItemID}`, ItemBarcode, {
            height: 30,
            background: "",
            format: "CODE128",
            displayValue: true
        });
        */
        
    });

    const downloadQR = () => {
        if(qrcoderef.current){
            qrcoderef.current.download('png', qrcode)
        }
    }

    const deleteItem = async () => {
        const param = {
            "Username": Username,
            "LastName" : LastName,
            "Email" : Email,
            "ItemBarcode" : ItemBarcode
        };
        const options = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "authorization" : "Bearer " + localStorage.getItem('access_token'),
            },
            body: JSON.stringify(param),
        };
        const response = await fetch(API.SERVER + "/api/item/delete", options);
        const data1 = await response.json();
        console.log( await data1)
        PopupHandler(data1.msg != "Not authorized"? data1.msg : "Refresh and login again!");
        authStore.dispatch(getItems("", await data1.result.Username))
        
        return data1;
    }

    return (
        <ItemCardsContainer>
            {qrdisplay ? 
            <div 
            style = {{display: qrdisplay ? "flex" : "none", position: "relative", height: "100%", width: "100%", alignItems: "center", justifyContent: "center", flexDirection: "column", cursor: "pointer", transition: "all .5s ease-out"}} 
            onClick={()=>{setQrdisplay(!qrdisplay)}}><QRCode ref = {qrcoderef} value = {qrcode} bgColor="#e5e4e2" logoImage={Logo} removeQrCodeBehindLogo = {true}></QRCode> 
            <div style = {{fontSize: ".8rem", fontWeight: "bold"}}>click to close</div><button onClick={downloadQR}>Download</button></div>
            : 
            <ItemCards>
                <DeleteBtn onClick={deleteItem}><img src = {Delete}></img></DeleteBtn>
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
                    <QRcodeBtn onClick={()=>{setQrdisplay(!qrdisplay)}}>QRcode</QRcodeBtn>
                    <ViewDetailsBtn href={qrcode}>View Details</ViewDetailsBtn>
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
            </ItemCards>}
            
        </ItemCardsContainer>
    )
}

//    <img id={date+ItemID} style = {{alignSelf: "center", justifySelf: "center", height: "100%", width: "100%", objectFit: "cover"}} alt = {ItemBarcode}></img>
                