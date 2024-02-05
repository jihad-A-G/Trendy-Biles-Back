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
import io from './config/socketIo.js'
import {createServer} from 'http'
import { authenticate } from './middleware/auth.js'
dotenv.config()
const app = express()
//middlware to parse request body that doesn't contains files(multer will do parse the one contains files)
app.use(bodyParser.urlencoded({extended:false}))
//middleware to parse json objects
app.use(express.json())
//define images folder as static folder
app.use('/images',express.static('images'))
//Allow access from any origin
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
 credentials: true,
}))

app.use(cookieParser())


app.use((req,res,next) => {
    console.log(`//${req.method} ${req.path} `);
    next()
})



//Routes goes here
app.use("/api/users",UsersRoutes)
app.use("/api/admins",AdminsRoutes)
app.use('/api/aboutus',authenticate,AboutusRouter)
app.use('/api/roles',RoleRouter)
app.use('/api/orders',OrderRouter)
app.use('/api/products',ProductRouter)
app.use('/api/productDetails',ProductDetailsRouter)
app.use('/api/categories',CategoryRouter)
app.use('/api/brands',BrandRouter)




//this middleware coonect to the mongodb atlas cluster, 'db_string' is the connection string
await connect(process.env.CONNECTION_STRING)
const httpServer = createServer(app)

io.attach(httpServer)

//test socket connection
io.on("connection", (socket) => {
    console.log(socket.id);
    socket.on('joinSuperAdminRoom',(superAdmin)=>{
      if(superAdmin.roles.name==='Super-Admin'){
        socket.join('superAdminRoom');
        const users= io.sockets.adapter.rooms.get('superAdminRoom');
        console.log("super admin joined the room");
        console.log(users?.size);
      }
    })
})
//test socket disconnection
io.on('disconnect',()=>{console.log("Client Disconnected");})

httpServer.listen(process.env.PORT,(err) => {
    if(err){
        console.log('Something went wrong',err);
    }
    else{
        console.log(`Server starting on port ${process.env.PORT}`);
    }
    
})
