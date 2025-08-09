setup project with typescript
    1. npm init -y
    2. npm i --save-dev typescript
    3. npm i --save-dev ts-node
    4.npm i --save-dev @types/node
    5.m i express
    6. npm i --save-dev @types/express
    7. npm i bcrypt
    8. npm i cors
    9. npm i mongoose
    10. create tsconfig.json file in root and paste these codes
        {
            "compilerOptions": {
                "target": "ES2020",
                "module": "commonjs",
                "strict": true,
                "esModuleInterop": true,
                "skipLibCheck": true,
                "forceConsistentCasingInFileNames": true,
                "outDir": "./dist"
            },
            "include": ["src"],
            "exclude": ["node_modules"]
        }
    11. create a script like "dev" and "build" in script of package.json file and paste these code
        "dev" : "nodemon"
        "build" : "tsc"
    
    12. create a nodemon.json file for setup nodemon and automatically restart the server
        {
            "watch" : ["src],
            "ext" : "ts",
            "exec" : "ts-node src/index.ts"
        }
    13. npm i nodemon

    Steps wise working folder 
        1. MODELS
        2. CONTROLLERS
        3. ROUTES
        4. ROOT





S3 Connect package install in aws : -
    npm i @aws-sdk/client-s3 @aws-sdk/s3-request-presigner