const User=require("../../../models/user");
const jwt=require("jsonwebtoken");//jsonwebtoken library is used to create token and passport is capable to decrypt the encrypt token
module.exports.create_session=async function(req,res)
{
  let user=await User.findOne({email:req.body.email});
  {
      try
      {
        if(!user || user.password!=req.body.password)
        {
            return res.json(522,{
                message:"Invailid user/password"})
        }
        return res.json(200,
            {
                message:"sign in successful ,here is your token keep it safe",
                token:jwt.sign(user.toJSON(),'codeial',{expiresIn:'100000'})//doubt sign??
            }
            )
      }
      catch(err){
        console.log("*****error",err);
        return res.json(500,
         {
             message:"Internal server Error"
         })

      }
  }
}