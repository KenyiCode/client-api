const express = require("express")
const router = express.Router()

const {verifyRefreshJWT, createAccessJwt} = require("../helpers/jwt.helper")
const { getUserByEmail } = require("../model/user/User.model")

router.get("/", async (req, res, next) => {
    const {authorization} = req.headers

    const decoded = await verifyRefreshJWT(authorization)
    if (decoded.email) {
        const userProf = await getUserByEmail(decoded.email)
        if (userProf._id) {
            let tokenExp = userProf.refreshToken.addedAt 
            tokenExp = tokenExp.setDate() + +process.env.JWT_REFRESH_SECRET_EXP_DAY
            const today = new Date()
            if (tokenExp < today) {
                return res.status(403).json({message: "Forbidden"})
            }

            const accessJWT = await createAccessJwt(
                decoded.email, userProf._id.toString()
            )

            return res.json({status: "Success", message: accessJWT})
        }
    }

    return res.json({status: 403, message: "Forbidden"})
})

module.exports = router