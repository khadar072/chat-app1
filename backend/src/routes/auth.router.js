import express from 'express'
import { getUser, login, register, update } from '../controllers/auth.controller.js'
import { userauth } from '../middlewares/auth.middleware.js'
import upload from '../config/multer.js'


const router = express.Router()

router.post('/register',register)
router.post('/login',login)
router.get('/get-user',userauth,getUser)
router.put('/update',userauth,upload.single("propic "),update)

export default router