import styled from "styled-components"
import { useEffect, useState } from "react";
import { authSlice } from "../../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { create } from "../../utils/Item";

import FileUpload from "../../components/FileUpload";
import ItemCard from "../../components/ItemCard";
import Global from "../../styles/Global";
const Page = styled.div`
    ${Global.Animations.SlideInTop}
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
  background: none;
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
  background: none;
  &:focus{
    outline: none;
    box-shadow: 0 15px 10px -15px #000;
  }
`

const CategoryBox = styled.div`
  display: ${props => props.$isexpanded ? "flex" : "none"};
  align-self: center;
  align-items: center;
  justify-self: center;
  overflow: auto;
  flex-direction: row;
  gap: 5px;
  
  background: none;

`

const Category = styled.div`
  border-radius: 4px;
  border: 1px solid black;
  display: grid;
  text-align: center;
  background: none;
`

const CreateItemInputBoxContainer = styled.div`
  
  justify-self: center;
  box-shadow: 0 0 5px #000;
  border: none;
  gap: 10px;
  border-radius: 4px;
  display: grid;
  height: ${props => props.$isexpanded ?  "fit-content" : "44px"};
  transition: height .3s;
  position: relative;
  width: 90%;
  padding: ${props => props.$isexpanded ?  "15px" : "none"};
  margin: 15px;

`

const DescriptionInputBox = styled.input`
  display: ${props => props.$isexpanded ? "flex" : "none"};
  border: none;
  align-self: center;
  justify-self: center;
  width: 90%;
  background: none;
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

const Container = styled.div`
  display: ${props => props.$isexpanded ? "grid" : "none"};
  gap: 15px;
`


function CreateItem({expanded, handleFocus, handleBlur, addData}){
  const [categories, setCategories] = useState([]);
  const [currentCategoryText, setCurrentCategoryText] = useState("");
  const [item, setItem] = useState({
    "Username" : "",
    "ItemName" : "",
    "ItemImage" : "",
    "ItemBarcode" : "",
    "ItemCategory" : []
  });
  const user = useSelector(state => state.auth);
  // pending, fulfilled, rejected are the three states
  const [imageURL, setimageURL] = useState({
    "status" : "pending",
    "url" : ""
  });

  const handleImage = (status, url) => {
    setimageURL({"status" : status, "url" : url})
  }

  const handleSubmit = (e)=>{
    console.log(e.target.value)
    setItem({...item, "ItemName" : e.target.value, "ItemImage" : imageURL.url})
    if(e.key == "Enter"){
      console.log("enter is pressed", e.target.value);
      //setItem({...item, "ItemName" : e.target.value, })
      Submit(user.user, user.access_token);
      e.target.value = "";
      
      setCategories([]);
    }
    
  }

  const Submit = (user, access_token) => {
    create(access_token, {...item, "Username" : user.Username, "ItemCategory" : [...categories], "ItemImage" : imageURL.url});
  }

  const handleSubmitCategories = (e) => {
    setCurrentCategoryText(e.target.value);
    if(e.key == "Enter" && e.target.value != ""){
      setCategories([...categories, e.target.value])
      e.target.value = "";
    }
  }

  const handleCategoriesAdd = () => {
    if(currentCategoryText != ""){
      setCategories([...categories, currentCategoryText])
      setCurrentCategoryText("");
    }
  }
  const removeCategoryItem = (e) => {
    console.log(e.key); 
  }
    return(
      <CreateItemInputBoxContainer onClick = {handleFocus} $isexpanded = {expanded}>
        <CreateItemInputBox placeholder="Create an item..." onKeyUp={handleSubmit}></CreateItemInputBox>
          <Container $isexpanded = {expanded}>
          <DescriptionInputBox $isexpanded = {expanded} placeholder="Enter description...">
          
          </DescriptionInputBox>

          <div style = {{display: "grid", gridAutoFlow: "column"}}>
          <CategoryBox $isexpanded = {expanded} style = {{justifySelf: "end"}}>
            Category: 
            <div style = {{display: "flex", flexDirection: "row"}}>
            <CategoryInputBox $isexpanded = {expanded} placeholder="Enter categories..." onKeyUp={handleSubmitCategories}></CategoryInputBox>
            <button onClick={handleCategoriesAdd}>Add</button>
            </div>          
          </CategoryBox>
          
          <div style = {{justifySelf: "start"}}>
          <FileUpload imageStatus = {imageURL.status} imageURL = {imageURL.url} handleImage={handleImage}>
          </FileUpload>
          </div>
          </div>
          <div style = {{display: "grid", alignSelf: "center", justifySelf: "center", gridAutoFlow: "column", overflow: "hidden", gap: "4px"}}>
          Categories: 
            {categories.map((e, index)=>{
              return <Category key = {index}>{e} </Category>
            })} 
          </div>
  
            
          <SubmitButton $isexpanded = {expanded} onClick={()=>{Submit(user.user, user.access_token)}}>Create Item</SubmitButton>
        
          </Container>
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
  
     
    border-radius: 4px;
    align-self: center;
    justify-self: center;
    align-items: center;
    display: grid;
    `

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

    const ItemContainer = styled.div`
    position: relative;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 40px;
    margin: 20px;
    margin-bottom: 20px;
    background-color: #b7b8c0;
    padding: 20px;
    border-radius: 10px;
    `




export default function Inventory(){
    const [expanded, setExpanded] = useState(false);
    const [data, setData] = useState([]);
    const [rendered, setRendered] = useState(false);
    const user = useSelector(state => state.auth);
    const dispatch = useDispatch();
    useEffect(()=>{
      const sse = new EventSource(`http://localhost:3000/api/item/stream/${user.user.Username}`);
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
/**
  <ItemCardsContainer key = {element.ItemID}>
                    <ItemCards key = {element.ItemID} style = {{backgroundColor: "grey"}}>
                    <div>ItemName: {element.ItemName}</div>
                    <div>Username: {element.Username}</div>
                    <div>ItemBarcode: {element.ItemBarcode}</div>
                    <div>ItemCategory: {element.ItemCategory}</div>
                    <img src = {element.ItemImage} height={"50px"} alt = "itemimage"></img>
                    </ItemCards>
                  </ItemCardsContainer>
 */
    return (
        <Page onClick={handleBlur}>
                <CreateItem expanded = {expanded}  handleBlur = {handleBlur} handleFocus = {handleFocus} addData = {addData}> 
                
                </CreateItem>
                <Content onClick={handleBlur}>
                <div style = {{height: "100%", width: "100%", display: data.length > 0 ? "block" : "none"}}>
                <ItemContainer>
                  {data.map((element, index) => {
                    return (
                    <ItemCard key = {element.ItemID} ItemCategory={element.ItemCategory} ItemImage={element.ItemImage} ItemAmount={element.ItemAmount ? element.ItemAmount : 0} Username = {element.Username} ItemID = {element.ItemID} ItemName={element.ItemName ? element.ItemName : "placeholder"} ItemBarcode={element.ItemBarcode ? element.ItemBarcode : "0000"}></ItemCard>
                  )})}
                  </ItemContainer>
                </div>
                </Content>
        </Page>
    )
}