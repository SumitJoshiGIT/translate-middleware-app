const connectdb=require("./database/database")
const {GetLang, getLangData}=require('./controllers/api-post.js')
const path=require('path')
const express=require('express');
const bodyparser=require('body-parser');
const app=express();
const getroutes=require('./routes/get')
const authroutes=require('./routes/auth')
const apiroutes=require('./routes/api-routes');
const settingroutes=require('./routes/settings');
const {GetLangCache,WriteLangCache}=require('./utils/edit-json.js');
const limit=60*60*1000*24
const {engine}=require('express-handlebars')
const session=require('express-session');
const SECRET=process.env.MSECRET
const Mongodbstore = require('connect-mongodb-session')(session);
store=new Mongodbstore({uri:SECRET,collection:"sessions"})

//setInterval(GetLang,limit)

async function startserver(){
  const ctime=new Date();
  let cache=await GetLangCache();
  if(!cache||ctime-cache.date>1296E06){
     const data=await GetLang();
     console.log(data)
     if(data){ 
      cache=data;
      console.log(await WriteLangCache(cache));
      }
   }
   await GetLang(cache); 
   console.log(await getLangData())
   app.listen(3000,()=>console.log("server active..."));
  
}

connectdb(startserver)
app.use(session({secret:"secret",resave:false,saveUninitialized:false,
                cookie:{
                  httpOnly:true, 
                  maxAge:1000*60*60*24},
                  store:store}))

app.use(bodyparser.urlencoded({extended:true}))
app.engine('handlebars',engine())
app.set('view engine','handlebars');
app.set('views',"./views");
app.use(express.static('public'))

app.use(getroutes);
app.use(authroutes);
app.use(settingroutes)
app.use(apiroutes)





