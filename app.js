const {dbConnect,Getdb,getDbUrl}=require("./utils/database")
const path=require('path')
const express=require('express');
const parser=require('express-parser');
const app=express();
const getroutes=require('./routes/get')

function startserver(){
  var db=Getdb();
  var Users=db.collection("Users");
  app.listen(3000);
}
dbConnect(startserver)

const session=require('express-session');
//const Mongodbstore = require('connect-mongodb-session')(session);
//store=new Mongodbstore({url:process.env.MSECRET,collection:"sessions"})
app.set('view engine','hbs');
app.set('views',"views");
app.use(session({secret:"secret",resave:false,saveUninitialized:false,cookie:{maxAge:1000*60*60*24}}))
app.use((req,res,next)=>{console.log(req.session);next();})
app.use(express.static('public'))

app.get(getroutes);








