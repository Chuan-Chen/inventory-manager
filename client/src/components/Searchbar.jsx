
import { useEffect, useState } from "react";
import searchIcon from "../assets/search.svg";
import "../styles/searchbar.css";
import styled from "styled-components"
import * as JsSearch from 'js-search';
import API from "../features/api"
import ItemCard from "./ItemCard";
import Global from "../styles/Global";


const Searchbar_page = styled.div`
@-webkit-keyframes fade-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  @keyframes fade-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
    -webkit-animation: fade-in .3s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
    animation: fade-in .3s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;

    z-index: 2;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(10px);
    position: absolute;
    display: grid;
    grid-template-rows: 10% 90%;
    grid-auto-flow: row;
    align-items: center;
    justify-items: center;
`

const SearchBar = styled.input`
    height: 40px;
    width: 100%;
    border-radius: 7px;
    border: none;
    font-size: 1.5em;
    outline: none;
    justify-self: center;
    align-self: center;
    grid-template-columns: search;
`

const SearchBarContainer = styled.div`
    gap: 20px;
    height: auto;
    width: 100%;
    display: grid;
    align-items: center;
    justify-items: center;
    grid-auto-flow: column;
    grid-template-columns: [searchicon] 1fr [search] 3fr [empty] 1fr;
`

const SearchIcon = styled.img`
    height: 42px;
    width: 42px;
    cursor: pointer;
    grid-template-columns: searchicon;
    justify-self: end;
`

const ExitBtn = styled.div`
    position: absolute;
    height: 32px;
    width: 32px;
    cursor: pointer;
    right: 10px;
    top: 10px;
`
const ItemContainer = styled.div`
    height: 90%;
    width: 80%;
    position: relative;
    display: grid;
    gap: 40px;
    margin: 20px;
    margin-bottom: 20px;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    background-color: ${Global.Styles.AccentColor};
    padding: 20px;
    border-radius: 10px;
    overflow-y: scroll;
    align-self: start;
`


export default function Searchbar({toggle, display}){

    const [searchParam, setSearchParam] = useState();
    const [items, setItems] = useState({"status" : "pending"});
    //<div className = "searchbar_page" style = {{display: display ? "grid" : "none"}}>
    const [search, setSearch] = useState(new JsSearch.Search("_id"))
    const [searchResult, setSearchResult] = useState([]);

    const getData = async () => {
        const options ={
            method: "POST"
        }
        const data = await fetch(API.SERVER + "/api/search", options);
        const parsedData = await data.json();
        setItems({...parsedData.data, "status" : "fulfilled"})
        search.addDocuments(parsedData.data);
        
        return parsedData;
    }

    const searchinfo = (data) =>{
        setSearchResult(search.search(data))
    }
    
    useEffect(()=>{
            if(items.status === "pending"){
                search.indexStrategy = new JsSearch.AllSubstringsIndexStrategy();
                search.SearchIndex = new JsSearch.TfIdfSearchIndex('_id')
                search.addIndex("Username");
                search.addIndex("ItemName");
                search.addIndex("ItemImage");
                search.addIndex("ItemBarcode");
                search.addIndex("ItemCategory");
                search.addIndex("createdAt");
                search.addIndex("ItemID");
            }
            if(toggle){
                getData(); 
            }
            
    }, [])


    return (
        <Searchbar_page style = {{display: display ? "grid" : "none"}}>
            
                <SearchBarContainer>
                <ExitBtn className="searchbar_page_exit" onClick={toggle}>X</ExitBtn>
                <SearchIcon src = {searchIcon} className="search_icon"></SearchIcon>
                <SearchBar placeholder="Search..." onChange = {(e)=>{searchinfo(e.target.value)}}></SearchBar>

                </SearchBarContainer>
                <ItemContainer>
                    {searchResult.map((element, index)=>{return (<ItemCard key = {element.ItemID} ItemCategory={element.ItemCategory} ItemImage={element.ItemImage} ItemAmount={element.ItemAmount ? element.ItemAmount : 0} Username = {element.Username} ItemID = {element.ItemID} ItemName={element.ItemName ? element.ItemName : "placeholder"} ItemBarcode={element.ItemBarcode ? element.ItemBarcode : "0000"}></ItemCard>)})}
                </ItemContainer>
        </Searchbar_page>
    )
}