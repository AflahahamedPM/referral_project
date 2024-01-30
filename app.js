import express from 'express'
const app = express()
import path from 'path'
import morgan from 'morgan'
import dotenv from 'dotenv'
dotenv.config({path:"config.env"})
import dbConnect from './dbConnection.js'
import userRouter from './routes/userRouter.js'

dbConnect()

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(morgan('tiny'))

app.use("/",userRouter)

const PORT = process.env.PORT

app.listen(PORT,()=>{
    console.log(`server listening at port ${PORT}`);
})