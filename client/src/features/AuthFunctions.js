import authStore from "./authSlice";
import { authSlice } from "./authSlice";


const Login = async (Username, Password)=> {

    const param = {
        "Username": Username,
        "Password": Password 
    };
    
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authorization" : "Bearer " + localStorage.getItem('access_token'),
        },
        body: JSON.stringify(param),
    };
    const response = await fetch("http://localhost:3000/api/user/read", options);
    const data1 = await response.json();
    return data1;
}

const Signup = async (Username, Password, Email, FirstName, LastName) => {
    
    const param = {
        "Username" : Username,
        "Password" : Password,
        "Email" : Email,
        "FirstName" : FirstName,
        "LastName" : LastName
    };

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(param),
    };
    const response = await fetch("http://localhost:3000/api/user/create", options);
    const data = await response.json();
    localStorage.setItem('user', JSON.stringify(data));
    if(data.access_token){
        localStorage.setItem('isAuthenticated', true);
    } 
    return data;
}

const SignupWithGithub = async () => {
    const options = {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        query: {
            "client_id" : "Ov23li89YEGmiemPiS1t",
        }
    }

    const response = await fetch(`https://github.com/login/oauth/authorize`, options);
    console.log(await response.json())
    return await response.json();

}

const getauthTokenGithub = async () => {
    
}



const updateUser = async (Username, Email, FirstName, LastName, ProfilePicture, access_token) => {

    const param = {
        "Username": Username,
        "Email" : Email,
        "FirstName" : FirstName,
        "LastName" : LastName,
        "ProfilePicture": ProfilePicture
    };
    console.log(param);
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authorization" : "Bearer " + access_token,
        },
        body: JSON.stringify(param),
    };
    const response = await fetch("http://localhost:3000/api/user/update", options);
    const data = await response.json();
    console.log(data);
    return data;
}

export {Login, Signup, SignupWithGithub, getauthTokenGithub, updateUser}