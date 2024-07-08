import styled from "styled-components"
import { useEffect, useState } from "react";
import { authSlice } from "../../features/authSlice";
import { useDispatch } from "react-redux";
const Page = styled.div`
/* ----------------------------------------------
 * Generated by Animista on 2024-7-1 18:2:47
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info. 
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation slide-in-top
 * ----------------------------------------
 */
@-webkit-keyframes slide-in-top {
  0% {
    -webkit-transform: translateY(-1000px);
            transform: translateY(-1000px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    opacity: 1;
  }
}
@keyframes slide-in-top {
  0% {
    -webkit-transform: translateY(-1000px);
            transform: translateY(-1000px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    opacity: 1;
  }
}


	-webkit-animation: slide-in-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
	animation: slide-in-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;

    height: 100%;
    width: 100%;

    display: grid;




`

const Content = styled.div`
  width: 95%;
  height: 95%;
  background-color: #FFFFFF; 
  border-radius: 4px;
  align-self: center;
  justify-self: center;
  display: grid;
`

const CreateItemInputBox = styled.input`
  
  justify-self: center;
  height: 30px;
  width: 300px;
  box-shadow: 0 0 5px #000;
  border: none;
  border-radius: 4px;
  &:focus{
    outline: none;
  }

`

function CreateItem(){

  const [item, setItem] = useState({});
  const [expanded, setExpanded] = useState(false);


  const handleSubmit = (e)=>{
    if(e.key == "Enter"){
      console.log("enter is pressed")
    }
  }

  
    if(expanded){
      return (
        <div></div>
      )
    }else{
    return(
      <CreateItemInputBox placeholder="Create an item..." onKeyDown={handleSubmit}>

      </CreateItemInputBox>
    )
  }


  
}


export default function Inventory(){
    const [data, setData] = useState([]);

    const dispatch = useDispatch();
    useEffect(()=>{
      
        const sse = new EventSource('http://localhost:3000/api/item/stream');
        sse.onmessage = (event) => {
          setData(JSON.parse(event.data));
        }
      
      dispatch(authSlice.actions.checkToken());
      
      return ()=>{
        sse.close();  
      }
    },[]);

/**
 


{data.map((element) => {
              console.log(element)
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
        <Page>
          
            <Content>
              <CreateItem></CreateItem>
            </Content>
        </Page>
    )
}