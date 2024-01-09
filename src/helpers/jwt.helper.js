const jwt = require("jsonwebtoken")
const {setJWT, getJWT} = require("../helpers/redis.helper")

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
    const refreshToken = await jwt.sign({email}, 
        process.env.JWT_REFRESH_SECRET,
        {expiresIn: "30d"})
    
    return Promise.resolve(refreshToken)
}

module.exports = {
    createAccessJwt,
    createRefreshJwt
}