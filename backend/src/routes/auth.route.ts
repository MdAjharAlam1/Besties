import express from 'express'
import { getSession, Login, Logout, refreshToken, Signup, updateProfilePicture } from '../controllers/auth.controller'
import AuthMiddleware from '../middlewares/auth.middleware'
import refreshTokenMiddleware from '../middlewares/refresh.middleware'

const AuthRouter = express.Router()

AuthRouter.post('/signup',Signup)
AuthRouter.post('/login', Login)
AuthRouter.get('/session',getSession)
AuthRouter.put('/profile-picture',AuthMiddleware,updateProfilePicture)
AuthRouter.get('/refresh-token',refreshTokenMiddleware,refreshToken)
AuthRouter.post('/logout',AuthMiddleware,Logout)


export default AuthRouter