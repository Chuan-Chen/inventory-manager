import "../styles/sidebar.css"
import category from "../assets/category.svg"
import shelves from "../assets/shelves.svg"
import settings from "../assets/settings.svg"
import search from "../assets/search.svg"
import logo from "../assets/logo.svg"
import info from "../assets/info.svg"
import home from "../assets/home.svg"
import profile from "../assets/person.svg"
import {Link} from "react-router-dom"
import menu from "../assets/menu.svg"
import menu_open from "../assets/menu_open.svg";
import styled from "styled-components"


const LinkTo = styled(Link)`
    width: 80%;
    display: grid;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: inherit;
    user-select: none;

`

//<div id = "sidebar-parent" style = {{visibility: toggle ? "visible" : "hidden", width: toggle ? max_width : "0%", fontSize: toggle ? "1em" : "0em"}}>

export default function Sidebar({toggle, searchbar_toggle , clickHandler, width}){

    return (
            <div id="sidebar" style = {{visibility: toggle ? "visible" : "hidden", fontSize: toggle ? "1em" : "0em", width: !toggle ? '0%' : (width <= "768" ? "100%" : "20%")}}>
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
                <LinkTo to={"profile"}>
                <div id = "sidebar-items" onClick={(e)=>{clickHandler(e)}}>
                    <div id = 'sidebar-item-logo'>
                        <img src = {profile}></img>
                    </div>
                    <div id = "sidebar-items-description">Profile</div>
                </div>
                </LinkTo>
                <LinkTo to={"dashboard"}>
                <div id = "sidebar-items" onClick={(e)=>{clickHandler(e)}}>
                    <div id = 'sidebar-item-logo'>
                        <img src = {home}></img>
                    </div>
                    <div id = "sidebar-items-description">Dashboard</div>
                </div>
                </LinkTo>
                <LinkTo to = {"inventory"}>
                <div id = "sidebar-items" onClick={(e)=>{clickHandler(e)}}>
                    <div id = 'sidebar-item-logo'>
                        <img src = {shelves}></img>
                    </div>
                    <div id = "sidebar-items-description">Inventory</div>
                </div>
                </LinkTo>
                <LinkTo to = {"category"}>
                <div id = "sidebar-items" onClick={(e)=>{clickHandler(e)}}>
                    <div id = 'sidebar-item-logo'>
                        <img src = {category}></img>
                    </div>
                    <div id = "sidebar-items-description">Categories</div>
                </div>
                </LinkTo>
                <LinkTo to ={"setting"}>
                <div id = "sidebar-items" onClick={(e)=>{clickHandler(e)}}>
                    <div id = 'sidebar-item-logo'>
                        <img src = {settings}></img>
                    </div>
                    <div id = "sidebar-items-description">Setting</div>
                </div>
                </LinkTo>
            </div>
            <div id = "sidebar-divider"></div>
            <div id = "sidebar-about">
                <div id = "sidebar-item-logo">
                    <img src = {info}></img>
                </div>
                <LinkTo to = {"about"}>
                    <div id = "sidebar-about-description">Contact Me</div>
                </LinkTo>
            </div>
        </div>
    )
}