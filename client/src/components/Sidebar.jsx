import "../styles/sidebar.css"
import category from "../images/category.svg"
import shelves from "../images/shelves.svg"
import settings from "../images/settings.svg"
import search from "../images/search.svg"
import logo from "../images/logo.svg"
import info from "../images/info.svg"
import home from "../images/home.svg"
import profile from "../images/person.svg"
import {Link} from "react-router-dom"
import menu from "../images/menu.svg"
import menu_open from "../images/menu_open.svg";
import { useState } from "react"


export default function Sidebar({toggle, searchbar_toggle , max_width}){

    return (
        <div id = "sidebar-parent" style = {{visibility: toggle ? "visible" : "hidden", width: toggle ? max_width : "0%", fontSize: toggle ? "1em" : "0em"}}>
            <div id="sidebar">
            <div id = "logo">
                <img src = {logo} height = "100%" width = "20%"></img>
                <div id = "sidebar-logo-description">Shelfy</div>
            </div>
            <div id = "sidebar-container">
                <div id = "searchArea" alt = "Search..">
                    <div id = "sidebar-item-logo">
                        <img id = "sidebar-search-icon" src = {search} onClick={searchbar_toggle}></img>
                    </div>
                    <input id = "sidebar-search" placeholder="Search..."></input>
                </div>
                <div id = "sidebar-items">
                    <div id = 'sidebar-item-logo'>
                        <img src = {profile}></img>
                    </div>
                    <Link to = "/"><div id = "sidebar-items-description">Profile</div></Link>
                    
                </div>
                <div id = "sidebar-items">
                    <div id = 'sidebar-item-logo'>
                        <img src = {home}></img>
                    </div>
                    <div id = "sidebar-items-description">Dashboard</div>
                </div>
                <div id = "sidebar-items">
                    <div id = 'sidebar-item-logo'>
                        <img src = {shelves}></img>
                    </div>
                    <div id = "sidebar-items-description">Inventory</div>
                </div>
                <div id = "sidebar-items">
                    <div id = 'sidebar-item-logo'>
                        <img src = {category}></img>
                    </div>
                    <div id = "sidebar-items-description">Categories</div>
                </div>
                <div id = "sidebar-items">
                    <div id = 'sidebar-item-logo'>
                        <img src = {settings}></img>
                    </div>
                    <div id = "sidebar-items-description">Setting</div>
                </div>
                
            </div>
            <div id = "sidebar-divider"></div>
            <div id = "sidebar-about">
                <div id = "sidebar-item-logo">
                    <img src = {info}></img>
                </div>
                <div id = "sidebar-about-description">About</div>
            </div>

        </div>
        </div>
        
    )


}