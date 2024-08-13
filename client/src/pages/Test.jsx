
import { useEffect, useState } from "react";
import authStore from "../features/authSlice";
import { authSlice, getItems } from "../features/authSlice";
import { Login } from "../components/AuthFunctions";
import { useDispatch, useSelector } from "react-redux";
import FileUpload from "../components/FileUpload";

export default function Test() {
    
    const [data, setData] = useState({});
    
    const dispatch = useDispatch();

    const items = useSelector(state => state.auth.items);

    
    return (
        <div>
            <button onClick={()=>{dispatch(getItems())}}>Load Items</button>
            <div style = {{display: "grid", gap: "10px"}}>
            {items.map((element) => {
                
                return (
                <div key = {element.ItemID} style = {{backgroundColor: "grey"}}>
                  <div>ItemName: {element.ItemName}</div>
                  <div>Username: {element.Username}</div>
                  <div>ItemBarcode: {element.ItemBarcode}</div>
                  <div>ItemCategory: {element.ItemCategory}</div>
                </div>)
              })}
            </div>

            <FileUpload>
              
            </FileUpload>
            
        </div>
    )


}