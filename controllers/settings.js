const path=require('path')
const Users=require(path.join("../",'database','Users'))

async function updateKeys(req,res,next){
  const keys=req.body.key
  const active=req.body.active
  if(keys instanceof Array && active instanceof Array){
    const user=await Users.findOne(req.user||req.session.user_local);
    user.keys=obj;
    try{
    await user.save();
    return res.json({success:true,message:"Keys saved successfully."});
   }
    catch(err){res.json({success:false,message:"Error retriving user keys."})}
 } 
  return res.json({success:false,message:"Invalid Keys"})
    
}

module.exports={updateKeys}