const express = require("express")
const router = express.Router()
const {insertUser, getUserByEmail, getUserById} = require("../model/user/User.model")
const {setPasswordResetPin} = require("../model/resetPin/ResetPin.model")
const {hashPassword, comparePassword} = require("../helpers/bcrypt.helper")
const {createAccessJwt, createRefreshJwt} = require("../helpers/jwt.helper")
const {userAuthorization} = require("../middleware/authorization.middleware")

router.all("/", (req, res, next) => {
    //res.json({ message: "Return form user router" })

    next()
})

//Get user profile router
router.get("/", userAuthorization, async (req, res) => {
    const _id = req.userId
    const userProf = await getUserById(_id)

    res.json({user: userProf})
})

//New user router
router.post("/", async (req, res) => {
    const {name, phone, email, password} = req.body
    try {
        //hash password
        const hashedPassword = await hashPassword(password)
        const newUserObj = {
            name,
            phone,
            email,
            password: hashedPassword
        }

        const result = await insertUser(newUserObj)
        console.log(result)

        res.json({message: "New user created", result})
    }
    catch (error) {
        console.log(error)

        res.json({status: "error", message: error.message})
    }
})

//Sign in router
router.post("/login", async (req, res) => {
    const {email, password} = req.body

    if (!email || !password) {
        return res.json({status: "error", message: "Form submission error"})
    }

    // Confirm account exists and obtaining hashed pw
    const user = await getUserByEmail(email)
    const passFromDb = user && user._id ? user.password : null

    if (!passFromDb) {
        return (
            res.json({status: "error", message: "Invalid email or password"})
        )
    }

    // Compare plaintext password with obtained hashed pw
    const result = await comparePassword(password, passFromDb)

    if (!result) {
        return (
            res.json({status: "error", message: "Invalid email or password"})
        )
    }

    const accessJwt = await createAccessJwt(user.email, `${user._id}`)
    const refreshJwt = await createRefreshJwt(user.email, `${user._id}`)

    res.json({
        status: "success",
        message: "login successful",
        accessJwt,
        refreshJwt
    })

})

//Reset password router
router.post("/reset-password", async (req, res) => {
    const {email} = req.body
    const user = await getUserByEmail(email)
    if (user && user.id) {
        const resetPin = await setPasswordResetPin(user.email)
        return res.json(resetPin)
    }

    res.json({status: "Error", message: "Forbidden"})
})

module.exports = router