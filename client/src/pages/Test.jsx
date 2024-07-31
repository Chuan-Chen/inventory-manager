
import { useEffect, useState } from "react";
import authStore from "../features/authSlice";
import { authSlice } from "../features/authSlice";
import { Login } from "../components/AuthFunctions";
import { useDispatch, useSelector } from "react-redux";

export default function Test() {
    
    const [data, setData] = useState({});
    
    const dispatch = useDispatch();

    const items = useSelector(state => state.auth.items);


    
    return (
        <div>
            <button onClick={()=>{}}>Load Items</button>
            {items}
        </div>
    )


}