import styled from "styled-components"
import { useEffect, useState } from "react";
import { authSlice, getItems } from "../../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { create } from "../../utils/Item";

import FileUpload from "../../components/FileUpload";
import ItemCard from "../../components/ItemCard";
import Global from "../../styles/Global";
import { FetchUserItem } from "../../features/Item";
import API from "../../features/api";
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
  background-color: ${Global.Styles.SecondaryAccentColor};
  justify-self: center;
  box-shadow: 0 0 5px #000;
  border: none;
  gap: 10px;
  border-radius: 4px;
  display: grid;
  height: ${props => props.$isexpanded ?  "fit-content" : "44px"};
  opacity: 1;
  transition: all .3s ease-out;
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
      background-color: #fcfbff;
      border: none;
      border-radius: 4px;
      font-size: 1.2em;
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

const QuantityInput = styled.input`
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

const Container = styled.div`
  display: ${props => props.$isexpanded ? "grid" : "none"};
  gap: 15px;
`

function CreateItem({expanded, handleFocus, handleBlur, addData, popupHandler}){
  const [categories, setCategories] = useState([]);
  const [currentCategoryText, setCurrentCategoryText] = useState("");
  const [item, setItem] = useState({
    "Username" : "",
    "ItemName" : "",
    "ItemImage" : "",
    "ItemBarcode" : "",
    "ItemCategory" : [],
    "ItemDescription" : "",
    "ItemAmount" : ""
  });
  const user = useSelector(state => state.auth);
  // pending, fulfilled, rejected are the three states
  const [imageURL, setimageURL] = useState({
    "status" : "pending",
    "url" : ""
  });
  const dispatch = useDispatch();
  const handleImage = (status, url) => {
    setimageURL({"status" : status, "url" : url})
  }

  const handleSubmit = (e)=>{
    console.log(e.target.value)
    setItem({...item, "ItemName" : e.target.value, "ItemImage" : imageURL.url})
    if(e.key == "Enter"){
      //console.log("enter is pressed", e.target.value);
      //setItem({...item, "ItemName" : e.target.value, })
      Submit(user.user, user.access_token);
      e.target.value = "";
      
      setCategories([]);
    }
    
  }

  const updateDescription = (e) => {
    setItem({...item, "ItemDescription" : e.target.value});
    console.log(item)
  }

  const Submit = async (user, access_token) => {
    const result = await create(access_token, {...item, "Username" : user.Username, "ItemCategory" : [...categories], "ItemImage" : imageURL.url});
    console.log(result);
    popupHandler(result.msg);
    dispatch(getItems(access_token, user.Username))
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

  const handleQuantity = (e) => {
    setItem({...item, "ItemAmount" : e.target.value})
  }

    return(
      <CreateItemInputBoxContainer onClick = {handleFocus} $isexpanded = {expanded}>
        <CreateItemInputBox placeholder="Create an item..." onKeyUp={handleSubmit}></CreateItemInputBox>
          <Container $isexpanded = {expanded}>
          <DescriptionInputBox $isexpanded = {expanded} placeholder="Enter description..." onKeyUp={updateDescription}>
          
          </DescriptionInputBox>
          
          <div style = {{display: "grid", gridAutoFlow: "column", alignItems: "center", justifyContent: "center", width: "90%"}}>
          <CategoryBox $isexpanded = {expanded} style = {{justifySelf: "end"}}>
            Category: 
            <div style = {{display: "flex", flexDirection: "row"}}>
            <CategoryInputBox $isexpanded = {expanded} placeholder="Enter categories..." onKeyUp={handleSubmitCategories}></CategoryInputBox>
            <button onClick={handleCategoriesAdd} style = {{background: "none", border: "1px solid black", borderRadius: "4px"}}>Add</button>
            </div>          
          </CategoryBox>
          
          <div style = {{justifySelf: "start"}}>
          <FileUpload imageStatus = {imageURL.status} imageURL = {imageURL.url} handleImage={handleImage}>
          </FileUpload>
          </div>
          <QuantityInput placeholder="Quantity" onKeyUp={handleQuantity} type="number" min="1"></QuantityInput>

          </div>
          <div style = {{display: "grid", alignSelf: "center", justifySelf: "center", gridAutoFlow: "column", overflow: "hidden", gap: "4px"}}>
           
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
    background-color: ${Global.Styles.BackgroundColor};
    padding: 20px;
    border-radius: 10px;
    `
    const PopUp = styled.div`
    ${Global.Animations.TrackingInFwdTop};
    display: ${props => props.$isDisplay == "" ? "none" : "grid"};
    align-items: center;
    justify-content: center;
    background: white;
    width: 250px;
    height: 50px;
    border-radius: 10px;
    position: absolute;
    right: 8px;
    bottom: 8px;
    `

/**
      const sse = new EventSource(`http://localhost:3000/api/item/stream/${user.user.Username}`);
        sse.onmessage = (event) => {
          //console.log(JSON.parse(event.data))
          setData(JSON.parse(event.data));
        }
  
        sse.onerror = (err) => {
          console.log("sse fialed")
          console.error("EventSource failed:", err);
        };
    return ()=>{
      //sse.close();  
    }
*/

/**
         if(user.items){
          setData(user.items);
        }else{
          dispatch(getItems(user.access_token, user.user.Username))
        }
        dispatch(authSlice.actions.checkToken())
 */

export default function Inventory(){
    const [expanded, setExpanded] = useState(false);
    const [data, setData] = useState([]);
    const [rendered, setRendered] = useState(false);
    const [err, setErr] = useState(false);
    const [popUpMsg, setpopUpMsg] = useState("");
    const user = useSelector(state => state.auth);
    const dispatch = useDispatch();
    useEffect(()=>{
      console.log(user.user.Username)
      if(user.items){
        setData(user.items);
        
      }else{
        
        dispatch(getItems(user.access_token, user.user.Username))
      }
      dispatch(authSlice.actions.checkToken())
    },[user.items]);


    const SSE = () => {
      const sse = new EventSource(`${API.SERVER}/api/item/stream/${user.user.Username}`);
      sse.onmessage = (event) => {
        //console.log(JSON.parse(event.data))
        setData(JSON.parse(event.data));
      }
      sse.onerror = (err) => {
        console.error(err)
        setErr(true);
        sse.close();
      }
      return sse;
    }

    const popupHandler = (message) => {
      setpopUpMsg(message);
      setTimeout(() => {
        setpopUpMsg("");
      }, 3000);
    }

    const fetchitem = async (Username) => {
      const param = {
        Username: Username
      }
      const options = {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(param),
      }
      const url = API.SERVER + "/api/item/read"
      const items = await fetch(url, options);
      const parsedData = await items.json();
      console.log(parsedData)
      setData(parsedData.result)
      //dispatch(authSlice.actions.loadItems(await parsedData.result));
    }
    
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
        <div style = {{height: "100%", width: "100%"}} onClick={handleBlur}>
        <PopUp $isDisplay={popUpMsg} onClick={handleBlur}>{popUpMsg}</PopUp>
        <Page onClick={handleBlur}>
                <CreateItem expanded = {expanded}  handleBlur = {handleBlur} handleFocus = {handleFocus} addData = {addData} popupHandler = {popupHandler}> 
                
                </CreateItem>
                <Content onClick={handleBlur}>
                <div style = {{height: "100%", width: "100%", display: data.length > 0 ? "block" : "none"}}>
                <ItemContainer>
                  {data ? data.map((element, index) => {
                    return (
                    <ItemCard 
                      key = {element.ItemID} 
                      ItemCategory={element.ItemCategory} 
                      ItemImage={element.ItemImage} 
                      ItemAmount={element.ItemAmount ? element.ItemAmount : 0} 
                      Username = {element.Username} 
                      ItemID = {element.ItemID} 
                      ItemName={element.ItemName ? element.ItemName : "placeholder"} 
                      ItemBarcode={element.ItemBarcode} 
                      LastName = {user.user.LastName} 
                      Email = {user.user.Email}
                      PopupHandler = {popupHandler}>
                    </ItemCard>
                  )}) : "Loading"}
                  </ItemContainer>
                </div>
                
                </Content>
                
        </Page>
        </div>
    )
}