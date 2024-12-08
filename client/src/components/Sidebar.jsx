import "../styles/sidebar.css"
import category from "../assets/category.svg"
import shelves from "../assets/shelves.svg"
import logout from "../assets/logout.svg"
import search from "../assets/search.svg"
import logo from "../assets/logo.svg"
import info from "../assets/info.svg"
import home from "../assets/home.svg"
import chat from "../assets/chat.svg"
import profile from "../assets/person.svg"
import {Link, redirect} from "react-router-dom"
import menu from "../assets/menu.svg"
import menu_open from "../assets/menu_open.svg";
import styled from "styled-components"
import { authSlice } from "../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";



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

    const dispatch = useDispatch();
    /** 
    <LinkTo to = {"category"}>
    <div id = "sidebar-items" onClick={(e)=>{clickHandler(e)}}>
        <div id = 'sidebar-item-logo'>
            <img src = {category}></img>
        </div>
        <div id = "sidebar-items-description">Categories</div>
    </div>
    </LinkTo>
    */

    return (
            <div id="sidebar" style = {{visibility: toggle ? "visible" : "hidden", fontSize: toggle ? "1em" : "0em", width: !toggle ? '0%' : (width <= "768" ? "100%" : "20%"), borderTopRightRadius: '20px', borderBottomRightRadius: "20px"}}>
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

                <LinkTo to = {"chat"}>
                <div id = "sidebar-items" onClick={(e)=>{clickHandler(e)}}>
                    <div id = 'sidebar-item-logo'>
                        <img src = {chat}></img>
                    </div>
                    <div id = "sidebar-items-description">Smart Archive</div>
                </div>
                </LinkTo>
                <LinkTo to = {"/auth"} onClick={()=>{
                    dispatch(authSlice.actions.logout());
                }}>
                <div id = "sidebar-items">
                    <div id = 'sidebar-item-logo'>
                        <img src = {logout}></img>
                    </div>
                    <div id = "sidebar-items-description">Logout</div>
                </div>
                </LinkTo>
            </div>
            <div id = "sidebar-divider"></div>
            <LinkTo to = {"about/app"} style = {{width: "80%"}}>
            <div id = "sidebar-about">
                <div id = "sidebar-item-logo">
                    <img src = {info}></img>
                </div>
                
                    <div id = "sidebar-about-description">Contact Me</div>
            </div>
            </LinkTo>
        </div>
    )
}