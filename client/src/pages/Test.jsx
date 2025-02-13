
import { useEffect, useState } from "react";
import authStore from "../features/authSlice";
import { authSlice, getItems } from "../features/authSlice";
import { Login } from "../features/AuthFunctions";
import { useDispatch, useSelector } from "react-redux";
import FileUpload from "../components/FileUpload";
import styled from "styled-components";
import ItemCard from "../components/ItemCard";
import DialogScreen from "../components/DialogScreen";
import EditProfile from "../components/EditProfile";

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

const EditButton = styled.button`
    position: absolute;
    background: none;
    display: ${props => !props.$toggle ? "block" : "none"};
    width: 200px;
    height: 200px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    &:hover{
      backdrop-filter: blur(3px);
    }
    &:active{
      backdrop-filter: blur(3px);
    }
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
              /*
<button onClick={()=>{dispatch(getItems())}}>Load Items</button>
            <FileUpload>
            </FileUpload>
            <div style = {{display: "grid", gridAutoFlow: "column"}}>
            <ItemCard ItemName = {"test"} ItemImage = {"https://static01.nyt.com/images/2021/02/17/dining/17tootired-grilled-cheese/17tootired-grilled-cheese-articleLarge.jpg?quality=75&auto=webp&disable=upscale"} ItemCategory = {["1tesasdfdfst", "2test", "3test", "4test", "5test", "5test", "dafsdf", "dafdfa", "dfadsf", "asdfasfda", "afsdf"]} Username = {"test"} ItemAmount={0} ItemID={1} ItemBarcode={1123410298}>
            </ItemCard>  
            <ItemCard ItemName = {"test"} ItemImage = {"https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp"} ItemCategory = {[]} Username = {"test"} ItemAmount={0} ItemBarcode={124123}>
            </ItemCard>
            </div>
            */
    return (
        <div>
            
            <DialogScreen Button = {<EditButton>Edit</EditButton>}>
              <EditProfile></EditProfile>
            </DialogScreen>
            <button onClick={()=>{dispatch(getItems())}}>Load Items</button>
            <FileUpload>
            </FileUpload>
            <div style = {{display: "grid", gridAutoFlow: "column"}}>
            <ItemCard ItemName = {"test"} ItemImage = {"https://static01.nyt.com/images/2021/02/17/dining/17tootired-grilled-cheese/17tootired-grilled-cheese-articleLarge.jpg?quality=75&auto=webp&disable=upscale"} ItemCategory = {["1tesasdfdfst", "2test", "3test", "4test", "5test", "5test", "dafsdf", "dafdfa", "dfadsf", "asdfasfda", "afsdf"]} Username = {"test"} ItemAmount={0} ItemID={1} ItemBarcode={1123410298}>
            </ItemCard>  
            <ItemCard ItemName = {"test"} ItemImage = {"https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp"} ItemCategory = {[]} Username = {"test"} ItemAmount={0} ItemBarcode={124123}>
            </ItemCard>
            </div>
        </div>
    )
}