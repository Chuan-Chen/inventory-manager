
import { useEffect, useState } from "react";
import authStore from "../features/authSlice";
import { authSlice, getItems } from "../features/authSlice";
import { Login } from "../components/AuthFunctions";
import { useDispatch, useSelector } from "react-redux";

export default function Test() {
    
    const [data, setData] = useState({});
    
    const dispatch = useDispatch();

    const items = useSelector(state => state.auth);

    useEffect(()=>{
     console.log(items)   
    }, [items])
    
    return (
        <div>
            <button onClick={()=>{dispatch(getItems())}}>Load Items</button>
            {}
        </div>
    )


}