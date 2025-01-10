import API from "./api"

const FetchUserItem = async (token, Username) => {
    console.log("fetching useritem")
    const param = {
        Username: Username
    }
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authorization" : "Bearer " + token,
        },
        body: JSON.stringify(param),
    }
    const url = API.SERVER + "/api/item/read";
    const data = await fetch(url, options);
    const parsedData = await data.json();
    console.log(parsedData)
    return await parsedData;

}

const FetchAllItem = async () => {
    const url = API.SERVER + "/api/item/read";
    const data = await fetch(url);
    const parsedData = await data.json();
    return parsedData;
}



export {
    FetchAllItem,
    FetchUserItem
}