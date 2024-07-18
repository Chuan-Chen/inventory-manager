import styled from "styled-components"
import { useEffect, useState } from "react";
import { authSlice } from "../../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { create } from "../../utils/Item";
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



const CreateItemInputBox = styled.input`
  justify-self: center;
  align-self: center;
  width: 90%;
  height: 95%;
  max-height: 23px;
  border: none;
  
  &:focus{
    outline: none;
    box-shadow: 0 15px 10px -15px #000;
  }
  @media only screen and (max-width: 768px) {
    width: 95%;
  }

`
const CategoryInputBox = styled.input`
  display: ${props => props.$isexpanded ? "block" : "none"};
  box-shadow: 0px 15px 10px -15px #000;
  border: 0px;
  border-radius: 4px;
  transition: height .3s;
  max-height: 25px;
  width: 50%;
  &:focus{
    outline: none;
    box-shadow: 0 15px 10px -15px #000;
  }
`

const CategoryBox = styled.div`
  display: ${props => props.$isexpanded ? "flex" : "none"};
  align-self: center;
  justify-self: center;
  overflow: auto;
  flex-direction: row;
  gap: 5px;
  height: 24px;
`

const Category = styled.div`
  border-radius: 4px;
  border: 1px solid black;
  display: grid;
  text-align: center;
`

const CreateItemInputBoxContainer = styled.div`
  
  justify-self: center;
  box-shadow: 0 0 5px #000;
  border: none;
  
  border-radius: 4px;
  display: grid;
  height: ${props => props.$isexpanded ?  "150px" : "44px"};
  transition: height .3s;
  position: relative;
  width: 60%;

`

const DescriptionInputBox = styled.input`
  display: ${props => props.$isexpanded ? "flex" : "none"};
  border: none;
  align-self: center;
  justify-self: center;
  width: 90%;
  border-bottom: 1px solid black;
  &:focus{
    outline: none;
  }
`

const SubmitButton = styled.button`
  display: ${props => props.$isexpanded ? "block" : "none"};
  width: 30%;
  height: 30px;
  align-self: center;
  justify-self: center;
  background: none;
  border: none;
  cursor: pointer;
  box-shadow: 0 0 5px #000;
  border-radius: 10px;
  user-select: none;
  &:active{
    outline: none;
    box-shadow: 0 15px 10px -15px #000;
  }
`


function CreateItem({expanded, handleFocus, handleBlur, addData}){
  const [categories, setCategories] = useState([]);
  const [item, setItem] = useState({
    "Username" : "",
    "ItemName" : "",
    "ItemImage" : "",
    "ItemBarcode" : "",
    "ItemCategory" : []
  });
  const user = useSelector(state => state.auth);


  const handleSubmit = (e)=>{
    console.log(e.target.value)
    setItem({...item, "ItemName" : e.target.value})
    if(e.key == "Enter"){
      console.log("enter is pressed", e.target.value);
      setItem({...item, "ItemName" : e.target.value})
      Submit(user.user, user.access_token);
      e.target.value = "";
      
      setCategories([]);
    }
    
  }

  const Submit = (user, access_token) => {
    create(access_token, {...item, "Username" : user.Username, "ItemCategory" : [...categories]});
  }

  const handleSubmitCategories = (e) => {
    if(e.key == "Enter" && e.target.value != ""){
      setCategories([...categories, e.target.value])
      e.target.value = "";
    }
  }
  const removeCategoryItem = (e) => {
    console.log(e.key); 
  }
    return(
      <CreateItemInputBoxContainer onClick = {handleFocus} $isexpanded = {expanded}>
        <CreateItemInputBox placeholder="Create an item..." onKeyDown={handleSubmit}></CreateItemInputBox>
          <DescriptionInputBox $isexpanded = {expanded} placeholder="Enter description...">

          </DescriptionInputBox>
          <CategoryBox $isexpanded = {expanded}>
            Categories: 
            {categories.map((e, index)=>{
              return <Category key = {index}>{e} </Category>
            })}
            <CategoryInputBox $isexpanded = {expanded} placeholder="Enter categories..." onKeyDown={handleSubmitCategories}></CategoryInputBox>
            
          </CategoryBox>
          <SubmitButton $isexpanded = {expanded} onClick={()=>{Submit(user.user, user.access_token)}}>Create Item</SubmitButton>
        </CreateItemInputBoxContainer>
      
    )
}

  /**
  const sse = new EventSource('http://localhost:3000/api/item/stream');
      sse.onmessage = (event) => {
        //console.log(JSON.parse(event.data))
        setData(JSON.parse(event.data));
      }
    
    dispatch(authSlice.actions.checkToken());
    
    return ()=>{
      sse.close();  
    }
   */

    const Content = styled.div`
    width: 95%;
    height: 95%;
    background-color: #FFFFFF; 
    border-radius: 4px;
    align-self: center;
    justify-self: center;
    align-items: center;
    display: grid;
    grid-template-rows: 1fr 4fr;
  
    `

    const ItemCards = styled.div`
    overflow: auto;
    border-radius: 5px;
    display: grid;
    min-height: 150px;
    align-items: center;

    `

    const ItemContainer = styled.div`
    position: relative;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 15px;
    margin: 20px;
    margin-bottom: 20px;
    background-color: #b7b8c0;
    padding: 20px;
    border-radius: 10px;
    `


export default function Inventory(){
    const [expanded, setExpanded] = useState(false);
    const [data, setData] = useState([]);

    const dispatch = useDispatch();
    useEffect(()=>{
      const sse = new EventSource('http://localhost:3000/api/item/stream');
      sse.onmessage = (event) => {
        //console.log(JSON.parse(event.data))
        setData(JSON.parse(event.data));
      }
    
    dispatch(authSlice.actions.checkToken());
    
    return ()=>{
      sse.close();  
    }

    },[]);
    const handleFocus = (e) => {
      e.stopPropagation()
      setExpanded(true);
    }
    const handleBlur = (e) => {
      e.stopPropagation()
      setExpanded(false);
    }

    const addData = (somedata) => {
      console.log(somedata);
      setData([...data, somedata])
    }

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
        <Page >
          
            <Content onClick={handleBlur}>
              <CreateItem expanded = {expanded}  handleBlur = {handleBlur} handleFocus = {handleFocus} addData = {addData}> 
                
              </CreateItem>
              <ItemContainer>
              {data.map((element) => {
                
                return (
                <ItemCards key = {element.ItemID} style = {{backgroundColor: "grey"}}>
                  <div>ItemName: {element.ItemName}</div>
                  <div>Username: {element.Username}</div>
                  <div>ItemBarcode: {element.ItemBarcode}</div>
                  <div>ItemCategory: {element.ItemCategory}</div>
                </ItemCards>)
              })}
              </ItemContainer>
            </Content>
        </Page>
    )
}