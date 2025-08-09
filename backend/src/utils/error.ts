import { Response } from "express"

interface ErrorMessage extends Error{
    status?:number
}

export const TryError = (message:string, status : number = 500) =>{
    const err : ErrorMessage = new Error(message)
    err.status = status
    return err
}

export const CatchError = (err:unknown , res:Response, prodMessage : string = "Internal Server Error") =>{
    if(err instanceof Error)
    {   
        const message = process.env.NODE_ENV === "dev" ? err.message : prodMessage
        const status = (err as ErrorMessage).status || 500
        res.status(status).json({message})
    }
}