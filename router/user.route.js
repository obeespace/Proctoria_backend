

import { Router } from 'express'


import UserController from '../backend/auth/controller.js'



const router = Router();



router.post('/register', UserController.signup)
router.post('/login', UserController.signin)


export default router