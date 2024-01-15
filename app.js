import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import connect from './config/db.js'
import cors from 'cors'
dotenv.config()
const app = express()
//middlware to parse request body that doesn't contains files(multer will do parse the one contains files)
app.use(bodyParser.urlencoded({extended:false}))
//middleware to parse json objects
app.use(express.json())
//Allow access from any origin
app.use(cors())

//Routes goes here


//this middleware coonect to the mongodb atlas cluster, 'db_string' is the connection string
await connect(process.env.CONNECTION_STRING)

app.listen(process.env.PORT,(err) => {
    if(err){
        console.log('Something went wrong',err);
    }
    else{
        console.log(`Server starting on port ${process.env.PORT}`);
    }
    
})
