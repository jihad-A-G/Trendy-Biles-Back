import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import connect from './config/db.js'
import cors from 'cors'
import AboutusRouter from './routes/aboutusRoute.js'
import RoleRouter from './routes/roleRoute.js'
import UsersRoutes from './routes/userRoute.js'
import AdminsRoutes from './routes/adminRoute.js'
dotenv.config()
const app = express()
//middlware to parse request body that doesn't contains files(multer will do parse the one contains files)
app.use(bodyParser.urlencoded({extended:false}))
//middleware to parse json objects
app.use(express.json())
//define images folder as static folder
app.use('/images',express.static('images'))
//Allow access from any origin
app.use(cors())

//Routes goes here
app.use("/api/users",UsersRoutes)
app.use("/api/admins",AdminsRoutes)
app.use('/api/aboutus',AboutusRouter)
app.use('/api/roles',RoleRouter)



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
