const UserModel = require('../models/UserModel.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const secrete = 'trope77_jedi'
let admintoken

const signup = async(req, res)=> {
    try {
        if (!req.body.email || !req.body.password || !req.body.firstname || !req.body.lastname || !req.body.classnumber){
            return res.status(400).send({message: "Kindly input all required fields"})
          }
        

        const {firstname, lastname, email, password, classnumber} = req.body
        const salt = await bcrypt.genSalt(10)
        const harshedPassword = await bcrypt.hash(password, salt)

        const user = new UserModel({
            firstname,
            lastname,
            email,
            classnumber,
            password: harshedPassword
        })

        const userRegData = await user.save()
        res.status(200).json(userRegData)

    } catch (error) {
        if(error.code === 1100 && error.keyValue){
            res.status(409).json({message: 'Email already already exists!'})
        }
        res.status(500).json({message: 'server error'})
    }
}

const signin = async(req, res) => {
    try {
        const {email, password} = req.body
        const user = await UserModel.findOne({email: email})
            if (!user){
                return res.status(401).json({message: 'Invalid email or password'})
            }

            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch){
                return res.status(401).json({message: 'Invalid email or password'})
            }

            const classnumber = user.classnumber
            const username = user.firstname

            if (email ==='obeewon20@gmail.com' && password === 'getitright'){
                admintoken = 'runjozi'
            } else {
                admintoken = ''
            }


            const payload = {userId: user._id}
            const token = jwt.sign(payload, secrete, {expiresIn: '1hr'})
            res.json({
                message: "Successful Login",
                classnumber,
                token: token,
                admintoken,
                username
            })
        

        // const userData = await userModel.find({})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = {
    signup,
    signin
}