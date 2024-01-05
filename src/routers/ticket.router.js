const express = require("express")
const router = express.Router()

router.all("/", (req, res, next) => {
    res.json({ message: "Ticket here" })

    next()
})

module.exports = router