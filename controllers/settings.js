const path=require('path')
const Users=require(path.join("../",'database','Users'))
const xss=require('xss');
async function updateKeys(req,res,next){
  if(!(req.user||req.session.user_local))return res.json({success:false,message:"Signin to continue"})
  const keys=req.body.keys
  console.log(req.body)
  const active=new Number(req.body.active);
  console.log(active,keys instanceof Array , active instanceof Number);
  if(keys instanceof Array && active instanceof Number){
    if(!keys)return res.json({success:false,message:"No keys in form."});
    else if(!active)return res.json({success:false,message:"No active key selected."});
    
    for(let i=0;i<keys.length;i++)keys[i]=xss(keys[i++]);
    const user=await Users.findOne(req.user||req.session.user_local);
    user.keys=keys;
    try{
    await user.save();
    return res.json({success:true,message:"Keys saved."});
   }
    catch(err){return res.json({success:false,message:"Error retriving user keys."})}
 } 
  return res.json({success:false,message:"Invalid Keys data."})
    
}

module.exports={updateKeys}