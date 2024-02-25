const connectdb=require("./database/database")
const path=require('path')
const express=require('express');
const parser=require('express-parser');
const app=express();
const getroutes=require('./routes/get')
const authroutes=require('./routes/auth')
const {engine}=require('express-handlebars')
async function startserver(){
  app.listen(3000,()=>console.log("server active..."));
}
console.log(process.env.MSECRET)
connectdb(startserver)

const session=require('express-session');
const Mongodbstore = require('connect-mongodb-session')(session);
store=new Mongodbstore({uri:process.env.MSECRET,collection:"sessions"})

app.engine('handlebars',engine())
app.set('view engine','handlebars');
app.set('views',"./views");

app.use(session({secret:"secret",resave:false,saveUninitialized:false,cookie:{maxAge:1000*60*60*24}}))

app.use((req,res,next)=>{console.log(req.session);next();})
app.use(express.static('public'))

app.use(getroutes);
app.use(authroutes);







