import { useState } from "react";
import searchIcon from "../images/search.svg";
import "../styles/searchbar.css";

export default function Searchbar({toggle}){

    return (
        <div className = "searchbar_page" style = {{display: toggle ? "grid" : "none"}}>
            <div className="searchbar_container">
                <div style = {{width: "80%", display: "grid", gridAutoFlow: "column"}}>
                <img src = {searchIcon} className="search_icon"></img>
                <input className = "searchbar" placeholder="Search..."></input>
                </div>
            </div>
        </div>
    )
}