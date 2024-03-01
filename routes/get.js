const exp=require('express')
const path=require('path')
const {checkUser,relayCSRF}=require(path.join('../','controllers','common'))
const {getLangData}=require('../controllers/api-post.js')

const router=exp.Router();


router.use(checkUser);
router.get('*',relayCSRF);

router.get("/",(req,res,next)=>{
  res.redirect("/home");
  })

router.get("/home",(req,res,next)=>{
   
  res.render('index',{layout:'main',user:req.user,csrfToken:req.csrfToken,lang:getLangData()});
  })
  
router.get("/about",(req,res,next)=>{
  res.render('about',{layout:'main',user:req.user});
})

module.exports=router