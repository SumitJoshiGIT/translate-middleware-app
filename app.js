const connectdb=require("./database/database")
const path=require('path')
const express=require('express');
const bodyparser=require('body-parser');
const app=express();
const getroutes=require('./routes/get')
const authroutes=require('./routes/auth')
const apiroutes=require('./routes/api-routes')

const {engine}=require('express-handlebars')
const session=require('express-session');
const SECRET=process.env.MSECRET
const Mongodbstore = require('connect-mongodb-session')(session);
store=new Mongodbstore({uri:SECRET,collection:"sessions"})


async function startserver(){
  app.listen(3000,()=>console.log("server active..."));
}

connectdb(startserver)
app.use(session({secret:"secret",resave:false,saveUninitialized:false,cookie:{maxAge:1000*60*60*24},store:store}))

app.use(bodyparser.urlencoded({extended:true}))
app.engine('handlebars',engine())
app.set('view engine','handlebars');
app.set('views',"./views");
app.use(express.static('public'))

app.use(getroutes);
app.use(authroutes);
app.use(apiroutes)





