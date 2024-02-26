const express=require("express")
const passport =require("passport");
const OAuth2Strategy=require('passport-oauth').OAuth2Strategy;

const credentials={
    clientID:process.env.client_id,  
    clientSecret:process.env.client_secret, 
    callbackURL:process.env.redirect_uris,
    tokenURL:process.env.token_uri,
    authorizationURL:process.env.auth_uri
    }

  passport.use('provider',new OAuth2Strategy(
  credentials
  ,function(accessToken, refreshToken, profile, done){
   console.log(this.arguments)
   done(null,profile);
}));

const router=express.Router();
router.use("/auth/redirect",passport.authenticate('provider',{
failureRedirect:"/login"}),(req,res)=>{res.redirect("/home")});

router.use("/auth/oauth",passport.authenticate('provider'))

module.exports=router;

