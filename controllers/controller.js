const path=require('path')
const ValidateUser=require(path.join('../','utils','utils'))

function signup(req,res,next){
    const response=JSON(parser(req.body));
    const result=ValidateUser(username=response["username"],response["password"])
    if(result){
       res.setHeader({"response-type":"applicaton/text"});
       res.session.user_id=result.user_id;
       res.send("Validated");
      }
    else if(result===false){
         res.send("User already exists");
    }  
    else{
        req.session.user_id=createUser(username,password);
        res.setHeader({"Location":'/home'});
        res.send();   
      }}


function login(req,res,next){ 
        if(ValidateUser(session=req.session)){
          res.send("User is already logged in");
        }
        else{
         const response=JSON(parser(req.body));
         const result=Validate(username=response["username"],password=response["password"]||true)
         if (result){
            req.session.user=result.user_id
            res.setHeader({"Location":'/home'});
            res.send();
         }
         else if(result===false){
          res.send("Wrong password for given username.");
         }
         else{
          res.send("Given username does not exist.");
         }}
    
    }      

module.exports={
         signup,login

}   