import express from 'express'
import AuthMiddleware from '../middlewares/auth.middleware'
import { fetchChats } from '../controllers/chat.controllers'

const ChatRouter = express.Router()

ChatRouter.get('/:to', AuthMiddleware, fetchChats)

export default ChatRouter