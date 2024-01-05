const bcrypt = require("bcrypt")
const saltRounds = 10 

const hashPassword = (plainText) => {
    return new Promise((resolve) => {
        resolve(bcrypt.hashSync(plainText, saltRounds))
    })
}

module.exports = {
    hashPassword
}