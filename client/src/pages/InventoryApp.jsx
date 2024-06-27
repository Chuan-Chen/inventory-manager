import "../styles/inventoryapp.css"
import {Link, Route, Routes, useParams} from "react-router-dom";
import Sidebar from "../components/Sidebar";
import MenuBtn from "../components/MenuBtn";
import Searchbar from "../components/Searchbar";
import { useEffect, useState } from "react";
import styled from "styled-components";
import useWindowDimensions from "../hooks/useWindowDimensions";


const DisplayPanel = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  align-items: center;
  justify-content: center;
`


function InventoryApp() {

  const [sidebarToggle, setSidebarToggle] = useState(false);
  const [searchbarToggle, setSearchBarToggle] = useState(false);
  const {height, width} = useWindowDimensions();
  const {id} = useParams();

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
  },[width]);
  /**
   * <MenuBtn toggle = {sidebarHandler}></MenuBtn>
      <Sidebar id="sidebar" toggle = {sidebarToggle} searchbar_toggle = {searchbarHandler} max_width = "20%" clickHandler = {clickHandler}/>
      <div style = {{width: "100%", margin: "60px",}}>{data}</div>
   */
  return (

    <div id = "app">
      <Searchbar toggle = {searchbarHandler} display = {searchbarToggle}></Searchbar>
      <MenuBtn toggle = {sidebarHandler}></MenuBtn>
      <Sidebar id="sidebar" toggle = {sidebarToggle} searchbar_toggle = {searchbarHandler} max_width = "100%" clickHandler = {clickHandler}/>
      <DisplayPanel>{id}</DisplayPanel>
    </div>
  )
}

export default InventoryApp
