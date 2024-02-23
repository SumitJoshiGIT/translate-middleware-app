const exp=require('express')
const path=require('path')
const router=exp.Router();

router.get("/",(req,res,next)=>{
   res.redirect("/home");
  })

router.get("/home",(req,res,next)=>{
    res.render('index.html');
  })
  
router.get("/about",(req,res,next)=>{
  res.render('about.html');
  
})

module.exports=router