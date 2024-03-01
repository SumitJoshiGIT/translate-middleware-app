const path=require('path');
const controllers=require(path.join('../','controllers','settings'));
const express=require('express');

const router=express.Router();

router.post('/keys',controllers.updateKeys);
module.exports=router;