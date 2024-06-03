const mongoose = require('mongoose')

const UserSchema = mongoose.Schema ({
    firstname: String,
    lastname: String,
    classnumber: Number,
    email: String,
    password: String
    
}, {timestamps: true})

const UserModel = mongoose.model('studentuser', UserSchema)
module.exports = UserModel