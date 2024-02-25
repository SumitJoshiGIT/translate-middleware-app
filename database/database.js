const mongoose=require("mongoose")
const path=require('path')
require('dotenv').config()
console.log(process.env.MSECRET)

async function connectdb(callback){ 
    await mongoose.connect(process.env.MSECRET);
    await callback()    
}

module.exports=connectdb;
