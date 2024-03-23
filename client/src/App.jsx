import "./styles/app.css"

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

  return (
    <div id = "app">
      <Searchbar toggle = {true}></Searchbar>
      <MenuBtn toggle = {sidebarHandler}></MenuBtn>
      <Sidebar id="sidebar" toggle = {sidebarToggle}/>
    </div> 
  )
}

export default App
