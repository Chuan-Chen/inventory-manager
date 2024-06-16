

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


export {Login, Signup}