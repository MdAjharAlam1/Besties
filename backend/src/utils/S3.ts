import { GetObjectCommand, HeadObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

type ACLType = "private" | "public-read"

const conn = new S3Client({
    region : process.env.REGION!,
    endpoint : `https://s3-${process.env.REGION}.amazonaws.com`,
    credentials :{
        accessKeyId : process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey : process.env.AWS_SECRET_ACCESS_KEY!
    }
})
export const isFileExist = async(path:string) =>{
    try {
        const command = new HeadObjectCommand({
            Bucket : process.env.S3_BUCKET!,
            Key: path
        })
        await conn.send(command)
        return true
    } catch (err) {
       return false 
    }

}

export const downloadObject = async(path:string,expiry:number = 60)=>{
    const options = {
        Bucket: process.env.S3_BUCKET!,
        Key : path
    }
     const command  = new GetObjectCommand(options)
    const url = await getSignedUrl(conn,command,{expiresIn:expiry})
    return url
}

export const uploadObject = async(path:string, type:string , expiry:number=60, acl : ACLType = "private")=>{
    const option = {
        Bucket : process.env.S3_BUCKET,
        Key : path,
        ContentType : type,
        ACL: acl
    }

    const command = new PutObjectCommand(option)
    const url = await getSignedUrl(conn,command,{expiresIn: expiry})
    return url

}