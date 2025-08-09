import express from 'express'
import { addFriend, deleteFriend, fetchFriend, FriendRequest, suggestedFriend, updateFriendRequest } from '../controllers/friend.controller'
const FriendRouter = express.Router()

FriendRouter.post('/', addFriend)
FriendRouter.get('/all',fetchFriend)
FriendRouter.get('/suggestion',suggestedFriend)
FriendRouter.get('/request',FriendRequest)
FriendRouter.put('/:id', updateFriendRequest)
FriendRouter.delete('/:id', deleteFriend)

export default FriendRouter