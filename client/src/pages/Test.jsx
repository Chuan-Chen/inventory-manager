
import { useEffect, useState } from "react";
import authStore from "../features/authSlice";
import { authSlice, getItems } from "../features/authSlice";
import { Login } from "../components/AuthFunctions";
import { useDispatch, useSelector } from "react-redux";
import FileUpload from "../components/FileUpload";
import styled from "styled-components";
import ItemCard from "../components/ItemCard";

const ItemCards = styled.div`
overflow: auto;
border-radius: 5px;
display: grid;
min-height: 150px;
align-items: center;
padding: 15px;
`

const ItemCardsContainer = styled.div`
  height: 100%;
  width: 100%;
`


export default function Test() {
    
    const [data, setData] = useState({});
    
    const dispatch = useDispatch();

    const items = useSelector(state => state.auth.items);

    /*
            {items.map((element) => {
                
                return (
                <div key = {element.ItemID} style = {{backgroundColor: "grey"}}>
                  <div>ItemName: {element.ItemName}</div>
                  <div>Username: {element.Username}</div>
                  <div>ItemBarcode: {element.ItemBarcode}</div>
                  <div>ItemCategory: {element.ItemCategory}</div>
                </div>)
              })}
    */
    return (
        <div>
            <button onClick={()=>{dispatch(getItems())}}>Load Items</button>

          


            <FileUpload>
              
            </FileUpload>

            <ItemCard ItemName = {"test"} ItemImage = {"test"} ItemCategory = {["1test", "2test", "3test", "4test", "5test"]} Username = {"test"} ItemAmount={0} ItemID={1}>
            
            </ItemCard>  
            <ItemCard ItemName = {"test"} ItemImage = {"test"} ItemCategory = {[]} Username = {"test"} ItemAmount={0}>
            
            </ItemCard> 
        </div>
    )


}