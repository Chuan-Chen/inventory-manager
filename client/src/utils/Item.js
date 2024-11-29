<<<<<<< Updated upstream


async function create(access_token, item){
    
    const param = {
        "Username" : item.Username,
        "ItemName" : item.ItemName,
        "ItemImage" : item.ItemImage,
        "ItemBarcode" : item.ItemBarcode,
        "ItemCategory" : [...item.ItemCategory]
    }
    
=======
async function create(Access_Token, User = {"Username" : "", "ItemName" : "", "ItemImage" : "", "ItemBarcode": "", "ItemCategory" : []}){
>>>>>>> Stashed changes
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
<<<<<<< Updated upstream
            "authorization" : "Bearer " + access_token,
        },
        body: JSON.stringify(param),
        
    };

    console.log(options)

    const response = await fetch("http://localhost:3000/api/item/create", options);
    const data = await response.json();

    console.log(data);

=======
            "authorization" : "Bearer " + localStorage.getItem('access_token'),
        },
        body: JSON.stringify(User),
        
    };
    const response = await fetch("http://localhost:3000/api/user/read", options);
    const data = await response.json();

>>>>>>> Stashed changes
    return data;
}

async function modify(){


}

async function del(){

}

async function read(){


}


<<<<<<< Updated upstream

export {create, modify, del, read}
=======
export {create}
>>>>>>> Stashed changes
