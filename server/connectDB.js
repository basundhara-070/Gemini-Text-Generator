const mongoose= require('mongoose');
require("dotenv").config();

const connectDB = async()=>{
    try{
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI)
        console.log("MongoDB Connected");
        //console.log(connectionInstance)
    }
    catch(error){
        console.log("Connection failed",error);
        process.exit(1);
    }
}

module.exports = connectDB;

