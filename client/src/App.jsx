import "./styles/app.css"
import {Link, Route, Routes} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import MenuBtn from "./components/MenuBtn";
import Searchbar from "./components/Searchbar";
import { useState } from "react";



function App() {

  const [sidebarToggle, setSidebarToggle] = useState(false);
  const [searchbarToggle, setSearchBarToggle] = useState(false);

  const sidebarHandler = () => {
    setSidebarToggle(!sidebarToggle);
  }

  const searchbarHandler = () => {
    setSearchBarToggle(!searchbarToggle);
    console.log("toggle called")
    return searchbarToggle;
  }

  return (
    <>
    <div id = "app">
      <Searchbar toggle = {searchbarHandler} display = {searchbarToggle}></Searchbar>
      <MenuBtn toggle = {sidebarHandler}></MenuBtn>
      <Sidebar id="sidebar" toggle = {sidebarToggle} searchbar_toggle = {searchbarHandler} max_width = "20%"/>
    </div> 
    <Routes>
      <Route path = "/" element ={<>home</>}></Route>
      <Route paht = "/landing" element={<>landingpage</>}></Route>
    </Routes>
    </>
    
  )
}

export default App
