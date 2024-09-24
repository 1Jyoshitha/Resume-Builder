//Require Statements
const express = require('express');
const dotenv = require('dotenv');
const connectDb = require('./database/config/config');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const cors   = require('cors')
require('colors')

//Dotenv Configuration
dotenv.config(); 

//Rest Object
const app = express();


//middleware
app.use(express.json())
app.use(cors())

//Database Configuration
connectDb();

//Routes
app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/user',userRoutes)
app.use('/api/v1/update',userRoutes)

//Welcome Rest API
app.get('/',(req,res)=>{
 res.send({message:"Welcome to Resume Craft"})
})


//P0RT
const PORT = process.env.PORT || 8080

//Run Listen
app.listen(PORT,(req,res)=>{
  console.log(`Server Running On Port ${PORT}`.bgCyan.white)
})