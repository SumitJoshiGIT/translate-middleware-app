const express =require('express');
const path=require('path')
const controllers=require(path.join('../','controllers','controller'))
console.log(controllers)
const router=express.Router();

router.use("auth/login",controllers.userExists)
router.use("auth/signup",controllers.userExists)

router.post("auth/login",controllers.login)
router.post("auth/signup",controllers.signup)
router.get("auth/login",controllers.loginPage)
router.get("auth/signup",controllers.signupPage)

module.exports=router;