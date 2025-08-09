import express from 'express'
import { downloadFile, uploadFile } from '../controllers/storage.controller'


const StorageRouter = express.Router()

StorageRouter.post('/download',downloadFile),
StorageRouter.post('/upload' , uploadFile)

export default StorageRouter