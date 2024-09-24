//Require Statements
const mongoose = require('mongoose');
require('colors')


//MongoDb Connection Function
const connectDb=async()=>{
    try{
     const connect = await mongoose.connect(process.env.MONGO_URL);
     console.log(`Successfully Connected To MongoDb Database ${connect.connection.host}`.bgMagenta.white)
    }
    catch(error){console.log(`Error in MongoDB connection ${error}`.bgRed.white)}
}


//Export Statement
module.exports = connectDb;