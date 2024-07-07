

import { Router } from 'express'


import UserController from '../controller/user.contoller.js'



const router = Router();



router.post('/register', UserController.signup)
router.post('/login', UserController.signin)


export default router