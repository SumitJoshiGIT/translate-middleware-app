const path=require('path')
const Users=require(path.join("../",'database','Users'))
const { v4: uuidv4 } = require('uuid');


async function checkUser(req,res,next){
    if(req.session.user_id){
      result=await Users.findById({"_id":req.session.user_id});
      req.user=result;
    } 
    next();
  }

async function relayCSRF(req,res,next){
  const randomUUID = uuidv4();
  console.log(randomUUID)
  req.csrfToken=randomUUID;
  req.session.csrfToken=randomUUID;
  next();  
}


module.exports={checkUser,relayCSRF};