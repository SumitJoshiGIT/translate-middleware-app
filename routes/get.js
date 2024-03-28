const exp=require('express')
const path=require('path')
const {getLangData}=require('../controllers/api-post.js')
const Users=require('../database/Users')
const router=exp.Router();

router.get("/",(req,res,next)=>{
  res.redirect("/home");
  })

router.get("/home",async (req,res,next)=>{
 
  let user=req.user;
  if(!user)user=req.session.user_local;
  if(user){
    user=await Users.findOne(user);
    user=(user)?user.toObject():null;
    console.log(user);
   }

  res.render('index',{layout:'main',user:user,csrfToken:req.csrfToken(),lang:getLangData()});
  })
  
router.get("/about",(req,res,next)=>{
  res.render('about',{layout:'main',user:req.user||req.session.user_local});
})

module.exports=router