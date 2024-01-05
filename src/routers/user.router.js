const express = require("express")
const router = express.Router()
const {insertUser} = require("../model/user/User.model")
const {hashPassword} = require("../helpers/bcrypt.helper")

router.all("/", (req, res, next) => {
    //res.json({ message: "Return form user router" })

    next()
})

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

module.exports = router