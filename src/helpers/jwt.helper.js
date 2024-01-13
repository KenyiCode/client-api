const jwt = require("jsonwebtoken")
const {setJWT, getJWT} = require("../helpers/redis.helper")
const {storeUserRefreshJWT} = require("../model/user/User.model")

const createAccessJwt = async (email, _id) => {
    try {
        const accessToken = await jwt.sign({email}, 
            process.env.JWT_ACCESS_SECRET,
            {expiresIn: "15m"})

        setJWT(accessToken, _id)
        
        return Promise.resolve(accessToken)
    } catch (error) {
       return Promise.reject(error)
    }
}

const createRefreshJwt = async (email, _id) => {
    try {
        const refreshToken = await jwt.sign({email}, 
            process.env.JWT_REFRESH_SECRET,
            {expiresIn: "30d"})
    
        await storeUserRefreshJWT(_id, refreshToken)
        
        return Promise.resolve(refreshToken)
    } catch (err) {
        return Promise.reject(err)
    }
}

module.exports = {
    createAccessJwt,
    createRefreshJwt
}