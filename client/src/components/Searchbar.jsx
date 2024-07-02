
import { useState } from "react";
import searchIcon from "../assets/search.svg";
import "../styles/searchbar.css";



function Search(item, user, category){
    const uri = "localhost:3000/item/read";
    
    if(item || user || category){
        fetch(uri, {

        });
    }

}




export default function Searchbar({toggle, display}){

    const [searchParam, setSearchParam] = useState({});
    

    return (
        <div className = "searchbar_page" style = {{display: display ? "grid" : "none"}}>
            <div className="searchbar_page_exit" onClick={toggle}>X</div>
            <div className="searchbar_container">
                <img src = {searchIcon} className="search_icon"></img>
                <input className = "searchbar" placeholder="Search..." onChange = {(e)=>{setSearchParam(e.target.value)}}></input>
                
            </div>
            
        </div>
    )
}