import {config} from 'dotenv'
config()

import mongoose from 'mongoose'
mongoose.connect(process.env.DB!)

import express from 'express'
import { createServer } from 'http'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { Server } from 'socket.io'
import CorsConfig from './utils/cors'



const app = express()
const server = createServer(app)

server.listen(process.env.PORT || 8080,()=>{
    console.log(`Server running on ${process.env.PORT}`)
})

//socket connection
import StatusSocket from './socket/status.socket'
import ChatSocket from './socket/chat.socket'
import VideoScoket from './socket/video.socket'

const io = new Server(server, {cors : CorsConfig})
StatusSocket(io)
ChatSocket(io)
VideoScoket(io)



// Middlewares
app.use(cors(CorsConfig))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:false}))


import AuthRouter from './routes/auth.route'
import StorageRouter from './routes/storage.route'
import AuthMiddleware from './middlewares/auth.middleware'
import FriendRouter from './routes/friend.route'
import SwaggerConfig from './utils/swagger'
import { serve, setup } from 'swagger-ui-express'
import ChatRouter from './routes/chat.route'





//Endpoints

app.use('/api-docs',serve,setup(SwaggerConfig))
app.use('/auth',AuthRouter)
app.use('/storage',AuthMiddleware,StorageRouter)
app.use('/friend',AuthMiddleware,FriendRouter)
app.use('/chat',ChatRouter)
