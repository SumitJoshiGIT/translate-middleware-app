const exp=require('express')
const path=require('path')
const {checkUser}=require(path.join('../','controllers','common'))
const router=exp.Router();


router.use(checkUser);

router.get("/",(req,res,next)=>{
   res.redirect("/home");
  })

router.get("/home",(req,res,next)=>{
    res.render('index',{layout:'main',user:req.user});
  })
  
router.get("/about",(req,res,next)=>{
  res.render('about',{layout:'main',user:req.user});
  
})

module.exports=router