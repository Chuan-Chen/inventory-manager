const fs = require('node:fs');

const preflight = () => {
    (()=>{
        try{
            if(!fs.existsSync("images/")) {
                fs.mkdirSync("images/")
            }
        }catch(err){
            console.log(err);
        }
    })()
}

module.exports = preflight;