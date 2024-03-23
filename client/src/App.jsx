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
      <Searchbar toggle = {false} ></Searchbar>
      <MenuBtn toggle = {sidebarHandler}></MenuBtn>
      <Sidebar id="sidebar" toggle = {sidebarToggle} max_width = "20%"/>
    </div> 
  )
}

export default App
