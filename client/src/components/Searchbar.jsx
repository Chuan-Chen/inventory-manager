import { useState } from "react";
import "../styles/search.css";

export default function Searchbar({clicked}){
    const [show, setShow] = useState(false);

    function showHandler() {
        setShow(!show);
    }
    

    return (
        <div style = {{display: show ? "block" : "none"}}>
            
        </div>
    )
}