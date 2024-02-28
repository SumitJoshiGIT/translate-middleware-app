const express =require('express');
const path=require('path');
const controllers=require(path.join('../','controllers','controller'))
console.log(controllers)
const router=express.Router();

router.get('/detect',)
router.get('/translate',)
router.get('/languages',)

