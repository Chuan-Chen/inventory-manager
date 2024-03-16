import "../styles/sidebar.css"
import category from "../images/category.svg"
import shelves from "../images/shelves.svg"
import settings from "../images/settings.svg"
import search from "../images/search.svg"
import logo from "../images/logo.svg"
import info from "../images/info.svg"
import home from "../images/home.svg"
import profile from "../images/person.svg"



export default function Sidebar(){


    return (
        <div id = "sidebar">
            <div id = "logo">
                <img src = {logo} height="70px"></img>
                <div id = "sidebar-logo-description">The Shelf</div>
            </div>
            <div id = "sidebar-container">
                <div id = "searchArea" alt = "Search..">
                    <div id = "sidebar-item-logo">
                        <img src = {search}></img>
                    </div>
                    <input id = "sidebar-search" placeholder="Search..."></input>
                </div>
                <div id = "sidebar-items">
                    <div id = 'sidebar-item-logo'>
                        <img src = {profile}></img>
                    </div>
                    <div id = "sidebar-items-description">Profile</div>
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
    )


}