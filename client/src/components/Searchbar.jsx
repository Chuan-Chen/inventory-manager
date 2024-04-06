import { useState } from "react";
import searchIcon from "../images/search.svg";
import "../styles/searchbar.css";

export default function Searchbar({toggle, display}){

    return (
        <div className = "searchbar_page" style = {{display: display ? "grid" : "none"}}>
            <div className="searchbar_page_exit" onClick={toggle}>X</div>
            <div className="searchbar_container">
                <img src = {searchIcon} className="search_icon"></img>
                <input className = "searchbar" placeholder="Search..."></input>
    
            </div>
        </div>
    )
}