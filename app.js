import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import connect from './config/db.js'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import AboutusRouter from './routes/aboutusRoute.js'
import RoleRouter from './routes/roleRoute.js'
import UsersRoutes from './routes/userRoute.js'
import AdminsRoutes from './routes/adminRoute.js'
import OrderRouter from './routes/orderRoute.js'
import ProductRouter from './routes/productRoute.js'
import ProductDetailsRouter from './routes/productDetailsRoute.js'
import CategoryRouter from './routes/categoryRoute.js'
import BrandRouter from './routes/brandRoute.js'
import { Server } from 'socket.io'
import {createServer} from 'http'
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

app.use(cookieParser())

app.use((req,res,next) => {
    console.log(`//${req.method} ${req.path} `);
    next()
})

app.use((req,res,next) =>{
    req.cookies.token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YTkzYWQyYTYyYTZmMWZlOGU0N2VhOCIsIm5hbWUiOiJhaG1hZCIsInJvbGVzIjoiNjVhNjg3Yjg4ZDU3MzRiMTEyNTNlYTYwIiwiaWF0IjoxNzA2NjA1NDczLCJleHAiOjE3MDY2OTE4NzN9.CI2P_5cJqgPeEDtyoz_T4s4BhScvtKWBOmegOHhB_bc'
    return next()
})

//Routes goes here
app.use("/api/users",UsersRoutes)
app.use("/api/admins",AdminsRoutes)
app.use('/api/aboutus',AboutusRouter)
app.use('/api/roles',RoleRouter)
app.use('/api/orders',OrderRouter)
app.use('/api/products',ProductRouter)
app.use('/api/productDetails',ProductDetailsRouter)
app.use('/api/categories',CategoryRouter)
app.use('/api/brands',BrandRouter)




//this middleware coonect to the mongodb atlas cluster, 'db_string' is the connection string
await connect(process.env.CONNECTION_STRING)
const httpServer = createServer(app)
const io = new Server(httpServer,{
    cors:{
        origin:'*',
        methods:['GET','POST','PUT','PATCH','DELETE']
    }
})
io.on("connection",(socket) =>{

        console.log(socket.id);

})

httpServer.listen(process.env.PORT,(err) => {
    if(err){
        console.log('Something went wrong',err);
    }
    else{
        console.log(`Server starting on port ${process.env.PORT}`);
    }
    
})
