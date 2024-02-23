function ValidateUser(username=null,password=null,session=null){
    const user=null;
    if(session && session.user_id)user=Users.findOne({"user_id":session.user_id});
    else if(username){
      user=Users.findOne({"username":username});
      if (user){
        if(password){
            if(password===true||user["password"]!=password)return false;
        } 
      } 
    }
    return user;
  };
module.exports=ValidateUser;