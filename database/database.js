const mongoose=require("mongoose")
const path=require('path')
require('dotenv').config()
let SECRET=process.env.MSECRET

async function connectdb(callback){ 
    await mongoose.connect(SECRET);
    await callback()    
}

module.exports=connectdb;
