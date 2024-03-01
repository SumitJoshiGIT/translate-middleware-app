const express =require('express');
const path=require('path');
const controllers=require(path.join('../','controllers','api-post'))

const router=express.Router();

router.get('/translate',controllers.Translate);


module.exports=router