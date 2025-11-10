import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import helmet from 'helmet'
import 'dotenv/config.js'
import { server, app } from './src/config/socket.io.js'

import authRouter from './src/routes/auth.router.js'
import messageRouter from './src/routes/message.router.js'
import connectCloudinary from './src/config/cloudinary.js'

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(helmet())

app.use('/api/auth', authRouter)
app.use('/api/messages', messageRouter)

const PORT = process.env.PORT || 5014

mongoose
  .connect(process.env.MONGOURL)
  .then(() => {
    console.log('✅ Database connected successfully')
    connectCloudinary()
    server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))
  })
  .catch((error) => console.error('❌ Database connection error:', error))
