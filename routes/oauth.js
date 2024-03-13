const Users=require('../database/Users')
const express=require("express")
const passport =require("passport");
const OAuth2Strategy=require('passport-oauth').OAuth2Strategy;

const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser(async function(user, done) {
  let u=await Users.findOne({email:user.email,gid:user.sub});
  if(!u)
      u=new Users({
         email:user.email,
         username:user.name,
         password:"",
         gid:user.sub         
        }).save();
        
  done(null,{gid:user.sub});
});

passport.deserializeUser(async function(user, done) {
  if(user){
   Users.findOne(user)
   .then(user=>done(null,user.toObject()))
   .catch(err=>done(err,null))
  }
  else done(null,null);
   
});

const credentials={
    clientID:process.env.client_id,  
    clientSecret:process.env.client_secret, 
    callbackURL:process.env.redirect_uris,     
    }

passport.use(new GoogleStrategy(  
   credentials,
   function(accessToken, refreshToken, profile, done){   
    
    done(null,profile['_json']);
}));

const router=express.Router();


router.use("/auth/oauth",passport.authenticate('google',{ scope: ['profile', 'email'] }))

router.use("/redirect",passport.authenticate('google',{

  failureRedirect:"/login"}),(req,res,next)=>{res.send(
    `<body>
    <script>
     console.log("Success");  
     window.opener.postMessage({verified:true},'*');
     window.close();</script></body>`)});

module.exports={oauthroutes:router,passport};

