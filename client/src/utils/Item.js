

async function create(access_token, item){
    
    const param = {
        "Username" : item.Username,
        "ItemName" : item.ItemName,
        "ItemImage" : item.ItemImage,
        "ItemBarcode" : item.ItemBarcode,
        "ItemCategory" : [...item.ItemCategory]
    }
    
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authorization" : "Bearer " + access_token,
        },
        body: JSON.stringify(param),
        
    };

    console.log(options)

    const response = await fetch("http://localhost:3000/api/item/create", options);
    const data = await response.json();

    console.log(data);

    return data;
}

async function modify(){


}

async function del(){

}

async function read(){


}



export {create, modify, del, read}