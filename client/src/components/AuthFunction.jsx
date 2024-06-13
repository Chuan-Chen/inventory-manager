import dotenv from "dotenv";
dotenv.config({
    path: ".env"
});


const sendAuth = async (Password, Username)=> {
    const param = {
        "Password": Password, 
        "Username": Username,
        "Date": new Date(),
    }
    
    const options = {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: param,
    }

    const response = await fetch(process.env.API_URI, options)
    return response;
}



export {sendAuth}