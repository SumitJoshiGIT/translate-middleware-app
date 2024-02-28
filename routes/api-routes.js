const express =require('express');
const path=require('path');
const controllers=require(path.join('../','controllers','api-post'))

console.log(controllers,controllers.GetLang)
const router=express.Router();

router.get('*',controllers.validate)
router.get('/detect',controllers.Detect);
router.get('/translate',controllers.Translate);

router.get('/getLang',controllers.GetLang);

module.exports=router