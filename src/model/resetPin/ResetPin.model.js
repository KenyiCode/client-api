const {ResetPinSchema} = require("./ResetPin.schema")
const {randomPin} = require("../../utils/randomGenerator")

//Creates reset pin obj
const setPasswordResetPin = async (email) => {
    const randPin = await randomPin(6)
    
    const resetObj = {
        email,
        pin: randPin
    }


    return new Promise((resolve, reject) => {
        ResetPinSchema(resetObj).save()
        .then((data) => resolve(data))
        .catch((error) => reject(error))
    })
}



module.exports = {
    setPasswordResetPin
}