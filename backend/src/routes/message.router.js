import express from 'express'
import { getMessages, getUsers, sendMessages } from '../controllers/message.controller.js'
import { userauth } from '../middlewares/auth.middleware.js'



const router = express.Router()

router.get('/get-users',userauth,getUsers)
router.get('/get-messages/:id', userauth,getMessages)
router.post('/send/:id',userauth,sendMessages)

export default router