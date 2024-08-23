import Model from './model.js'
import { genSalt, hash, compare } from 'bcrypt'

import pkg from 'jsonwebtoken';

const { sign } = pkg;


const secrete = 'trope77_jedi'
let adminToken


const UserController = {
   
    signup: async(req, res)=> {
        try {
            if (!req.body.email || !req.body.password || !req.body.firstname || !req.body.lastname || !req.body.classnumber){
                return res.status(400).send({message: "Kindly input all required fields"})
              }
            
    
            const {firstname, lastname, email, password, classnumber} = req.body
            const salt = await genSalt(10)
            const harshedPassword = await hash(password, salt)
    
            const user = new Model({
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
    },

    signin: async(req, res) => {
        try {
            const {email, password} = req.body
            const user = await Model.findOne({email: email})
                if (!user){
                    return res.status(401).json({message: 'User not found please signup'})

                }
    
                const isMatch = await compare(password, user.password)
                if (!isMatch){
                    return res.status(401).json({message: 'Invalid email or password'})
                }
    
                const useremail = user.email
                const classnumber = user.classnumber
                const username = user.firstname
    
                if (email ==='obeewon20@gmail.com' && password === 'getitright'){
                    adminToken = 'runjozi'
                } else {
                    adminToken = ''
                }
    
    
                const payload = {userId: user._id}
                const token = sign(payload, secrete, {expiresIn: '1hr'})
                res.json({
                    message: "Successful Login",
                    classnumber,
                    token: token,
                    admintoken: adminToken,
                    username,
                    useremail
                })
            
    
            // const userData = await userModel.find({})
        } catch (error) {
            res.status(500).json({message: error.message})
        }


    
    
}

}
export default UserController
