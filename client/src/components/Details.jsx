import { useEffect, useState } from "react"
import styled from "styled-components"
import Logo from "../assets/logo.svg";
import {Link} from "react-router-dom";
import Edit from "../assets/edit_square.svg"
import Global from "../styles/Global";
import authStore from "../features/authSlice";
import { getItems } from "../features/authSlice";
import API from "../features/api";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

const Image = styled.img`
    height: auto;
    width: 100%;
    max-width: 40vh;
    place-self: center;
    object-fit: contain;
    box-shadow: 0px 15px 35px -5px rgba(50, 88, 130, 0.32);
    border-radius: 5px;
    user-select: none;
    grid-area: image;
    
    @media(max-width: 800px){
        max-height: 50vh;
        width: 90%;
        overflow: hidden;
    }
    
`

const Page = styled.div`
    height: 100vh;

    width: 100%;
    min-width: 100vw;
    display: grid;
    grid-auto-rows: .8fr 11fr;
    @media(max-width: 800px){
        height: 100vh;
        border-radius: 0px;
    }

`


const Container = styled.div`
    display: grid;
    align-self: center;
    height: 80%;
    margin-left: 15%;
    margin-right: 15%;
    transition: all .2s ease-out;
    grid-template-areas:
    "image image wrapper wrapper wrapper" 
    "image image wrapper wrapper wrapper"
    "image image wrapper wrapper wrapper"
    "image image wrapper wrapper wrapper"
    "bwrapper bwrapper bwrapper bwrapper bwrapper";
          box-shadow: 0px 15px 35px -5px rgba(23, 53, 87, 0.59);
          background: #1f202a;
          color: white;
          text-shadow: 0px 0px 10px white;
          border-radius: 10px;
    @media(max-width: 800px){
        height: 100%;
        margin: 0px;
        border-radius: 0px;
        grid-template-areas:
        "image image image"
        "image image image"
        "image image image"
        "wrapper wrapper wrapper"
        "wrapper wrapper wrapper"
        "wrapper wrapper wrapper"
        "bwrapper bwrapper bwrapper";
    }

`

const Title = styled.div`
    grid-area: header;
    display: grid;
    font-weight: bold;
    font-size: 2.5rem;
    align-self: center;
    justify-self: center;
    grid-auto-flow: column;
    border-bottom: 1px solid grey;
`


const Detail = styled.div`
    grid-area: detail;
    display: flex;
    flex-direction: column;
    gap: 10px;
    div{
        font-weight: bold;
        font-size: 1.05rem;
    }
`



const WrapperRight = styled.div`
    display: grid;
    grid-area: wrapper;
    width: 90%;
    position: relative;
    grid-template-areas: 
    "header header"
    "itemdetail itemdetail" 
    "detail detail"
    "detail detail"
    "detail detail";
    @media(max-width: 800px){
        justify-self: center;
        gap: 40px;
        width: 90%;
    }

`

const ViewContainer = styled.div`
    justify-self: end;
    display: flex;
    flex-direction: column;
`

const BottomWrapper = styled.div`
    color: white;
    font-size: .6em;
    place-self: center;
    display: grid;
    position: relative;
    width: 95%;
    grid-area: bwrapper;
    align-items: end;
    grid-auto-flow: column;
`

const Header = styled.div`
    background-color: #1f202a;
    display: grid;
    grid-auto-flow: column;
    box-shadow: 0px 15px 35px -5px rgba(23, 53, 87, 0.59);
    color: white;
    text-shadow: 0px 0px 10px white;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    @media(max-width: 800px){
        height: 100%;
        border-bottom-left-radius: 0px;
        border-bottom-right-radius: 0px;
        box-shadow: none;
    }
`

const EditBtn = styled.button`
    background: none;
    color: white;
    border: grey 1px solid;
    border-radius: 5px;
    padding: 5px;
    cursor: pointer;
    &:hover{
          box-shadow: 0px 15px 35px -5px rgba(23, 53, 87, 0.59);
          background:rgb(47, 48, 64);
          color: white;
          text-shadow: 0px 0px 10px white;
    }
`

const EditImg = styled.img`
    filter: invert(99%);
    height: 20px; 
    width: auto;
`
const DeleteBtn = styled.button`
    background: none;
    color: white;
    border: grey 1px solid;
    border-radius: 5px;
    padding: 5px;
    cursor: pointer;
    &:hover{
          box-shadow: 0px 15px 35px -5px rgba(23, 53, 87, 0.59);
          background:rgb(47, 48, 64);
          color: white;
          text-shadow: 0px 0px 10px white;
    }
`

const ConfirmBtn = styled.div`
    background: black;
    color: white;
    border: grey 1px solid;
    border-radius: 5px;
    padding: 5px;
    cursor: pointer;
    height: fit-content;
    width: fit-content;
    &:hover{
          box-shadow: 0px 15px 35px -5px rgba(23, 53, 87, 0.59);
          background:rgb(47, 48, 64);
          color: white;
          text-shadow: 0px 0px 10px white;
    }
`

const Amount = styled.div`

`
const Cost = styled.div`

`

const Popup = styled.div`
    display: ${props => props.$isVis === "" ?  "none" : "grid"};
    ${Global.Animations.TrackingInFwdTop}
    transition: all .5s ease-out;
    background: white;
    position: absolute;
    bottom: 10px;
    right: 10px;
    height: 80px;
    width: 250px;
    border-radius: 10px;
    box-shadow: 0px 15px 35px -5px rgba(23, 53, 87, 0.59);
    align-items: center;
    justify-content: center;

`

const ConfirmPopup = styled.div`
    height: 100%;
    width: 100%;
    position: absolute;
    display: grid;
    backdrop-filter: blur(10px);
`

const EditInputBox = styled.input`
    display: ${props => props.$isDisplay && props.$x !== 0 ? "grid" : "none"};
    position: absolute;
    left: ${props => props.$x && props.$isDisplay ? props.$x + "px" : "0px" };
    top: ${props => props.$y && props.$isDisplay ? props.$y + "px" : "0px" };
    z-index: 2;
`


export default function Details({object, auth, user, profilePicture}){
    
    const [ItemDetails, setItemDetails] = useState(object[0]);
    const [updateItem, setUpdateItem] = useState(false);
    const [PopupText, setPopupText] = useState("")
    const [coord, setCoord] = useState({x : 0, y : 0, placeholder: null})
    const navigate = useNavigate();

    const handleEdit = (e) => {
        if(auth){
            setUpdateItem(!updateItem);
        }
        
    }   

    

    const changeItemObject = (e) => {
        console.log(e.target);
        //console.log({x: e.target.clientX, y: e.target.clientY,})
        setCoord({
            x: e.target.x,
            y: e.target.y,
            placeholder: e.target.id
        })
    }

    const changeItemDetails = (e) => {
    }

    useEffect(()=>{
        console.log(ItemDetails)
    }, []);

    const changepopup = (e) => {
        setPopupText(e.target.value)
        setTimeout(() => {return "grid"}, "3000")
    }

    const deleteItem = async () => {
        const param = {
            "Username": user.Username,
            "LastName" : user.LastName,
            "Email" : user.Email,
            "ItemBarcode" : ItemDetails.ItemBarcode
        };
        console.log(ItemDetails)
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
        authStore.dispatch(getItems("", await data1.result.Username))
        navigate('/app/inventory');
        return data1;
    }

    
    //addItem([title, price, image, 1])
    return (
        <Page>
            <EditInputBox $isDisplay = {updateItem} $x = {coord.x} $y = {coord.y} placeholder={coord.placeholder} onChange={changeItemDetails}></EditInputBox>
            <Header>
                <div style = {{height: "100%", display: "flex", fontWeight: "bolder", transition: "all .3s ease-out"}}>
                    <Link to = {"/"} style = {{display: "flex", alignItems: "center", justifyContent: "center", color: "white", textDecoration: "none"}}>
                        <img src = {Logo} style = {{alignSelf: "center", height: "90%", filter: "invert(99%) sepia(70%) saturate(280%) hue-rotate(263deg) brightness(114%) contrast(101%)"}}></img>
                        <div style = {{fontSize: "2rem", alignSelf: "center"}}>Shelfy</div>
                    </Link>
                    
                </div>
                <div style = {{alignSelf: "center", justifySelf: "end", margin: "20px", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px"}}>
                    {auth ? 
                    <> 
                        <DeleteBtn onClick={deleteItem}>Delete Item</DeleteBtn>
                        <EditBtn onClick={handleEdit}>{updateItem ? "Save" : "Edit Item"}</EditBtn>
                        <Link to = {"/app/profile"}>
                        <img src = {profilePicture} style = {{height: "32px", objectFit: "cover", width: "32px", borderRadius: "50px", boxShadow: "0px 15px 35px -5px rgba(23, 53, 87, 0.59)"}}></img>
                        </Link>
                        </>: 
                        <Link to = "/auth" style = {{color: "white", outline: "none", textDecoration: "none"}} onClick={() => {localStorage.setItem("previousLink", window.location.href)}}>Login</Link>
                    }
                </div>
            </Header>
            <Container>
                <div style = {{width: "90%", position: "relative", placeSelf: "center", maxWidth: "40vh", gridArea: "image"}}>
                    <Image src = {ItemDetails.ItemImage} draggable = "false"/>
                    <div style = {{position: "absolute", top: "-16px", right: "-16px"}}>{updateItem ? <EditImg id = {"ItemImage"} onClick = {changeItemObject} src = {Edit}></EditImg> : ""}
                    </div>
                </div>
                
                <WrapperRight>
                
                <Title>{ItemDetails.ItemName}{updateItem ? <EditImg id = {"ItemName"} onClick = {changeItemObject} src = {Edit}></EditImg> : ""}</Title>
                <div style = {{gridArea: "itemdetail", display: "flex", alignItems: "start", justifyContent: "center", gap: "20px", flexDirection: "column"}}>
                    <Amount>Quantity: {ItemDetails.ItemAmount}</Amount>
                    <Cost>Price: {ItemDetails.Cost}</Cost>
                    <div>Total Asset Value: {ItemDetails.ItemAmount * ItemDetails.Cost}</div>
                </div>
                <Detail>
                    <div>Product Details: </div>
                    <div>{ItemDetails.ItemDescription}{updateItem ? <EditImg id = {"ItemDescription"} onClick = {changeItemObject} src = {Edit}></EditImg> : ""}</div>
                </Detail>
                </WrapperRight>
                <BottomWrapper>
                <div style = {{justifySelf: "start", display: "flex", gap: "5px", width: "100%", gridTemplateColumns: "repeat(auto-fit, minmax(50px, 1fr))", maxHeight: "2em", overflowY: "hidden", textOverflow: "ellipsis"}} className="ItemCategory">
                        <div style = {{borderRadius: "3px", padding: "2px"}} >Tags:</div> {ItemDetails.ItemCategory.map((element, index)=>{
                        return <div style = {{border: "1px solid grey", borderRadius: "3px", padding: "2px", overflow: "hidden"}} key = {index}>{ItemDetails.ItemCategory[index]}</div>
                    })}{updateItem ? <EditImg id = {"ItemCategory"} onClick = {changeItemObject} src = {Edit}></EditImg> : ""}</div>
                <ViewContainer>
                    <div>Views: {ItemDetails.Views}</div>
                    <div>ID: {ItemDetails.ItemID}</div>
                </ViewContainer>
                </BottomWrapper>
            </Container>
        <Popup $isVis = {PopupText}>
            {PopupText}
        </Popup>

        </Page>
    )
}
/**
        <ConfirmPopup>
            <ConfirmBtn>Confirm</ConfirmBtn>
        </ConfirmPopup>
 */