import AuthApiDocs from "../swagger/auth.swagger"
import StorageApiDoc from "../swagger/storage.swagger"

const SwaggerConfig = {
    openapi:'3.0.0',
    info:{
        title:"Besties Official Api",
        description:'All the private or public listed here',
        version:'1.0.0',
        contact:{
            name:'Md Ajhar Alam',
            email:'mdajharalam68@gmail.com'
        }
    },
    servers:[
        {url: process.env.SERVER}
    ],
    paths:{
        ...AuthApiDocs,
        ...StorageApiDoc
    }
}

export default SwaggerConfig