

const Login = async (Username, Password)=> {
    const param = {
        "Username": Username,
        "Password": Password 
    };
    
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(param),
        
    };
    const response = await fetch("http://localhost:3000/api/user/read", options);
    return await response.json();
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
    return await response.json();
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

export {Login, Signup, SignupWithGithub, getauthTokenGithub}