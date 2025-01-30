import { useEffect } from "react";
import { useParams } from "react-router-dom"
import { useSearchParams } from "react-router-dom";
import API from "./api";

export default function Oauth(){
    const [searchParams, setSearchParams] = useSearchParams();
    const code = searchParams.get('code');

    const getToken = async () => {
        const data = await fetch(API.SERVER + "/api/oauth/" + "?code=" + code);
        console.log(API.SERVER + "/api/oauth/" + "?code=" + code);
        const result = await data.json();
        console.log(result);
        return result;
    }

    useEffect(()=>{
        getToken();
    },[])

    return (
        <div>
            Logging in via Github...
        </div>
    )
}