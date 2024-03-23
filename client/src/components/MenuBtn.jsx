import "../styles/menu.css"
import menu_icon from "../images/menu.svg";

export default function menu({toggle}) {
    return (
        <img className = "menu" src = {menu_icon} onClick={toggle}></img>
    )
}
