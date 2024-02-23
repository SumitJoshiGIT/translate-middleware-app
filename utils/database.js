require('dotenv').config();
SECRET=process.env.MSECRET
const mongodb=require('mongodb');
const MongoClient=new mongodb.MongoClient(SECRET);
let cl=null;

const dbConnect=(callback)=>
MongoClient.connect()
.then((client)=>{
    cl=client;
    console.log("DB connected");
    callback(); 
})
.catch((err)=>{throw err})

function getDbURL(){
    return SECRET
}
function Getdb(name=null){

    if (cl)return (name)?cl.db(name):
    
    cl.db();
    throw "Couldn't connect to Mongo";
}
module.exports={dbConnect,Getdb,getDbURL}
