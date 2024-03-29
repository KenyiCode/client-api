const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ResetPinSchema = new Schema({
    
    email: {
        type: String,
        maxlength: 50,
        required: true
    },
    pin : {
        type: String,
        maxlength: 6,
        minlength: 6
    }
})

module.exports = {
    ResetPinSchema: mongoose.model("ResetPin", ResetPinSchema)
}