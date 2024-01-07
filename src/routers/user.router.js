const express = require("express")
const router = express.Router()
const {insertUser, getUserByEmail} = require("../model/user/User.model")
const {hashPassword, comparePassword} = require("../helpers/bcrypt.helper")

router.all("/", (req, res, next) => {
    //res.json({ message: "Return form user router" })

    next()
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
    console.log(result)
    res.json({status: "Success", message: "Login successful"})

})

module.exports = router