const exp=require('express')
const path=require('path')
const router=exp.Router();

router.get("/",(req,res,next)=>{
   res.redirect("/home");
  })

router.get("/home",(req,res,next)=>{
    res.render('index',{layout:'index.hand'});
  })
  
router.get("/about",(req,res,next)=>{
  res.render('about');
  
})

module.exports=router