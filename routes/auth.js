const express =require('express');
const path=require('path');
const controllers=require(path.join('../','controllers','auth'))
const router=express.Router();

router.post('*',controllers.checkCSRF)
router.use("/auth/signup",controllers.userExists)
router.use("/auth/signin",controllers.userExists)
router.post("/auth/signin",controllers.login)
router.post("/auth/signup",controllers.signup)
router.get("/auth/signin",controllers.loginPage)
router.get("/auth/signup",controllers.signupPage)

module.exports=router;
