const express=require('express');
const path=require('path');
const controllers=require(path.join('../','controllers','auth'))
const router=express.Router();

router.use("/auth/signup",controllers.userExists);
router.post("/auth/signin",controllers.signin);
router.post("/auth/signup",controllers.signup);
router.get("/auth/signin",controllers.signinPage);
router.get("/auth/signup",controllers.signupPage);
router.post("/auth/logout",controllers.logout);
router.post("/auth/delete",controllers.deleteUser);
router.post("/auth/reset",controllers.reset);
router.post("/auth/verify",controllers.VerifyOTP);
module.exports=router;
