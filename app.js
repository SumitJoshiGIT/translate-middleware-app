const connectdb=require("./database/database")
const {GetLang}=require('./controllers/api-post.js')
const path=require('path')
const express=require('express');
const bodyparser=require('body-parser');
const app=express();
const {oauthroutes,passport}=require('./routes/oauth')
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
let store=new Mongodbstore({uri:SECRET,collection:"sessions"})
const  csrf=require('csurf');
const cors=require('cors');
//setInterval(GetLang,limit)

async function startserver(){
  const ctime=new Date();
  let cache=await GetLangCache();
  if(!cache||ctime-cache.date>1296E06){
     const data=await GetLang();
     if(data){ 
      cache=data;
      console.log(await WriteLangCache(cache));
      }
   }
   await GetLang(cache); 
   app.listen(3000,()=>console.log("server active..."));
  
}
connectdb(startserver)

app.set('trust proxy', 1);
app.use(session({secret:"secret",
                 resave:false,
                 saveUninitialized:false,
                 store:store,
                 
                 cookie:{
                  httpOnly:true, 
                  secure:true,
                  maxAge:1000*60*60*24,
                  sameSite:'strict'}
               }
               
               ))

app.use(passport.initialize());
app.use(passport.session());               
app.use(csrf());



app.use((req, res, next)=> {
      res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self';style-src 'self' 'unsafe-inline' ");
      res.setHeader('X-Frame-Options','DENY');
      
      next();
  })
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())

app.engine('handlebars',engine())
app.set('view engine','handlebars');
app.set('views',"./views");
app.use(express.static('public'))
app.use(cors({methods:['GET','POST'],origin:process.env.origins}))

app.use(getroutes);
app.use(oauthroutes);
app.use(cors({methods:'POST'}),authroutes);
app.use(settingroutes)
app.use(apiroutes)





