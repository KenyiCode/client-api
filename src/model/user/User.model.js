const {UserSchema} = require("./User.schema")

//Inserts new user in db
const insertUser = (userObj) => {
    return new Promise((resolve, reject) => {
        UserSchema(userObj).save()
        .then((data) => resolve(data))
        .catch((error) => reject(error))
    })
}

//Checks for existing user by email
const getUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        if (!email) return false

        UserSchema.findOne({email})
        .then((data) => resolve(data))
        .catch((error) => reject(error))
        })
}

const storeUserRefreshJWT = (_id, token) => {
    return new Promise((resolve, reject) => {
        try {
            UserSchema.findOneAndUpdate(
                {_id},
                {$set: {
                    "refreshToken.token": token,
                    "refreshToken.addedAt": Date.now()
                }},
                {
                    new: true
                }
            )
            .then((data) => resolve(data))
            .catch((error) => reject(error))
        } catch (err) {
            reject (err)
        }
    })
}

module.exports = {
    insertUser,
    getUserByEmail,
    storeUserRefreshJWT
}