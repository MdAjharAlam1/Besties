import { Response ,Request } from "express"
import { CatchError, TryError } from "../utils/error"
import { SessionInterface } from "../middlewares/auth.middleware"
import { downloadObject, isFileExist, uploadObject } from "../utils/S3"


export const downloadFile = async(req:Request, res:Response) =>{
    try {
        const path = req.body?.path

        if(!path){
            throw TryError('Failed to generate download url because path is missing')
        }

        const isExist = await isFileExist(path)
        if(!isExist){
            throw TryError('File does not exists', 404)
        }

        const url = await downloadObject(path)
        res.json({url})
    } catch (err) {
        CatchError(err,res,'Failed to generate download url')
    }
}

export const uploadFile = async(req:SessionInterface, res:Response) => {
    try {
        console.log(req.session)
        const path = req.body?.path
        const type = req.body?.type
        const status = req.body?.status
        // console.log(status,path,type)
        if(!path || !type || !status){
            throw TryError('Invailid request path or type is required',400)
        }

        const url = await uploadObject(path,type,3600,status)
        // console.log(url)
        res.json({url})
        
    } catch (err) {
        CatchError(err,res,'Failed to generate uplaod url')
    }
}