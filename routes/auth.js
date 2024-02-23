import express from 'express';
const keys=require('keys.json')
const controllers=require(path.join('../','controllers','controllers'))

const router=express.Router();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.post("/login",controllers.login)
app.post("/signup",controllers.signup)