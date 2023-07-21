const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const cors = require('cors')
dotenv.config()
const morgan = require('morgan')
const allRoutes = require('./routes/index')
const PORT = process.env.PORT || 8080;
const app = express()
app.use(express.json())
app.use(morgan('tiny'))
app.use(cookieParser())
app.use(cors('*'))
 

const connectDB = async ()=>{
    try {
        mongoose.connect(process.env.DB_CONNECTION_URI)
        console.log("database connection established")
        
    } catch (error) {
        console.error(error)
        
    }
}

app.use('/api',allRoutes);
app.use((err,req,res,next)=>{
    const status = err.statusCode || 500;
    const message = err.message || "Internal Server Error"
    return res.status(status).json({message,stack:err.stack})
})

app.listen(PORT,()=>{
    connectDB()
    console.log(`server listening on ${PORT}`)
})