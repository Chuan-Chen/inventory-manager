import "../styles/inventoryapp.css"
import {Link, Route, Routes, useParams, Outlet} from "react-router-dom";
import Sidebar from "../components/Sidebar";
import MenuBtn from "../components/MenuBtn";
import Searchbar from "../components/Searchbar";
import { useEffect, useState } from "react";
import styled from "styled-components";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { useSelector } from "react-redux";
import Global from "../styles/Global";

const DisplayPanel = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  @media only screen and (max-width: 768px) {
  height: calc(100% - 60px);
  }
`

const Page = styled.div`
    ${Global.Scrollbar}
    ${Global.Animations.TextFocusIn}
    background-color: ${Global.Styles.BackgroundColor};
    height: 100%;
    width: 100%;
    display: flex;
`


function InventoryApp() {

  const [sidebarToggle, setSidebarToggle] = useState(false);
  const [searchbarToggle, setSearchBarToggle] = useState(false);
  const {height, width} = useWindowDimensions();
  const {id} = useParams();

  const user = useSelector(state => state.auth);

  const sidebarHandler = () => {
    setSidebarToggle(!sidebarToggle);
  }

  const searchbarHandler = () => {
    setSearchBarToggle(!searchbarToggle);
    console.log("toggle called")
    return searchbarToggle;
  }

  const clickHandler = (e) => {
   
  }

  useEffect(()=>{
    if(width <= "768"){
      setSidebarToggle(true);
    }
    //console.log(user)
  },[width]);
  /**
   * <MenuBtn toggle = {sidebarHandler}></MenuBtn>
      <Sidebar id="sidebar" toggle = {sidebarToggle} searchbar_toggle = {searchbarHandler} max_width = "20%" clickHandler = {clickHandler}/>
      <div style = {{width: "100%", margin: "60px",}}>{data}</div>

 {(()=>{
          if(localStorage.getItem('isAuthenticated')){
            return (<div>welcome! {JSON.parse(localStorage.getItem('user')).FirstName}</div>)
          }else{
            return (<div>Not Authorized</div>)
          }
        })()}


        {(()=>{
          if(user.isAuthenticated){
            return (<div>welcome! {user.user.FirstName || JSON.parse(localStorage.getItem('user')).FirstName} <br></br> Email: {JSON.parse(localStorage.getItem('user')).Email} {id}</div>)
          }else{
            return (<div>Not Authorized</div>)
          }
        })()}

 
   */
  return (
    
    <Page>
      <Searchbar toggle = {searchbarHandler} display = {searchbarToggle}></Searchbar>
      <MenuBtn toggle = {sidebarHandler}></MenuBtn>
      <Sidebar width = {width} id="sidebar" toggle = {sidebarToggle} searchbar_toggle = {searchbarHandler} max_width = "100%" clickHandler = {clickHandler}/>
      <DisplayPanel>
      <Outlet />
      </DisplayPanel>
    </Page>
  )
}

export default InventoryApp
