const passport=require('passport')
const GoogleStrategy=require('passport-google-oauth').OAuth2Strategy;
require('dontenv').config();
const express=require('express');
const auth=express.auth();

passport.serializeUser((User,done)=>{
    done(null,User)
})

passport.deserializeUser((User,done)=>{
    done(null,User);
})

const Strategy=new GoogleStrategy({
    clientID:process.env.GoogleOauthID,
    clientSecret:process.env.GoogleOauthSecret,
    callbackURL:process.env.GoogleOauthCallback,
    scope:['email','profile']
},
    (token,rtoken,profile,done)=>{
         console.log(profile);
         done(null,profile);   

    })


auth.get("auth/oauth",passport.authenticate('provider'));

auth.get("auth/oauth/callback",passport.authenticate('provider',{
    failureRedirect:"/login",
    successRedirect:"/home"
}));

module.exports=auth