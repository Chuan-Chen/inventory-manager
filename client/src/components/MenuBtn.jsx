import "../styles/menu.css"
import menu_icon from "../assets/menu.svg";
import arrow_right from "../assets/arrow_right.svg"

export default function menu({toggle}) {
    
    if(toggle){
        return <img className = "menu" src = {menu_icon} onClick={toggle}></img>
    }else{
        return <img className = "menu" src = {arrow_right} onClick={toggle}></img>
    }

}
