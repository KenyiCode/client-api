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

const getUserById = (_id) => {
    return new Promise((resolve, reject) => {
        if (!_id) return false

        UserSchema.findOne({_id})
        .then((data) => resolve(data))
        .catch((error) => reject(error))
        })
}

module.exports = {
    insertUser,
    getUserByEmail,
    getUserById,
    storeUserRefreshJWT
}