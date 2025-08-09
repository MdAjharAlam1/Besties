import {config} from 'dotenv'
config()

import mongoose from 'mongoose'
mongoose.connect(process.env.DB!)

import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()
app.listen(process.env.PORT || 8080,()=>{
    console.log(`Server running on ${process.env.PORT}`)
})

app.use(cors({
    origin : process.env.CLIENT,
    credentials:true
}))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:false}))


import AuthRouter from './routes/auth.route'
import StorageRouter from './routes/storage.route'
import AuthMiddleware from './middlewares/auth.middleware'
import FriendRouter from './routes/friend.route'
import SwaggerConfig from './utils/swagger'
import { serve, setup } from 'swagger-ui-express'


app.use('/api-docs',serve,setup(SwaggerConfig))
app.use('/auth',AuthRouter)
app.use('/storage',AuthMiddleware,StorageRouter)
app.use('/friend',AuthMiddleware,FriendRouter)
