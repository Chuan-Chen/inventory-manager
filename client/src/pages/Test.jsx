
import { useEffect, useState } from "react";
import authStore from "../features/authSlice";
import { authSlice } from "../features/authSlice";
import { Login } from "../components/AuthFunctions";
import { useDispatch, useSelector } from "react-redux";

export default function Test() {
    
    const [data, setData] = useState({});
    
    const dispatch = useDispatch();
    

    useEffect(() => {

        console.log(data);
    }, [data])
    
    

    if(data.user){
        dispatch(authSlice.actions.login(data))
        return <div style = {{display: "grid", alignItems: "center", alignSelf: "center"}}>
            Username: {data.user.Username}
            <br></br>
            Email: {data.user.Email}
            <br></br>
            FirstName: {data.user.FirstName}
            <br></br>
            LastName: {data.user.LastName}
            <br></br>
            access_token: {data.access_token}
        </div>
    }else{
        return (
            <div>
                <button onClick={()=>{Login('123','123').then((data)=>{setData(data)})}} style = {{width: "200px"}}>connect</button>
                <div>loading...</div>
            </div>
            );
    }

    
}