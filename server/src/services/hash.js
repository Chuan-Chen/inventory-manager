const crypto = require("crypto")



function hash(Password){

    const salt = crypto.randomBytes(16).toString('base64');

    const HashedPassword = { 
        Password: crypto.createHash('sha512').update(salt + Password).digest('hex'),
        Salt: salt,
    }
    return HashedPassword;
}

function validate(Password, Salt, Hash) {
    if (crypto.createHash('sha512').update(Salt + Password).digest('hex') === Hash){
        return true;
    }
    return false; 
}

module.exports = {
    hash,
    validate,
}