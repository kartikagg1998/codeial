const Likes=require("../models/like");
const Posts=require("../models/post");
const Comments=require("../models/comment");

module.exports.toggleLike=async function (request,response)
{
    try{
        //likes/toggle/?id=abcde&type=post
         let likeable;
         let deleted=false;
        

         if(request.query.type=="Post")
         {
             likeable=await Posts.findById(request.query.id).populate('likes');
            
         }
         else{
            likeable=await Comments.findById(request.query.id).populate('likes');
            
         }

         //check if like alraeday exists
        //  console.log("Existing Like" , request.query.id , request.query.type ,request.user );
         let existingLike=await Likes.findOne(
             {
                 likeable:request.query.id,
                 OnModel:request.query.type,
                 user:request.user._id,
             }
         )

         //if like already exists then delete it
       
         if(existingLike)
         {
             likeable.likes.pull(existingLike._id);///likeable.likes means array of like in either post or comment
             likeable.save();
             existingLike.remove();
            deleted=true;
         }
         else{
             //make a new like
             let newLike= await Likes.create(
                 {
                     user:request.user._id,
                     likeable:request.query.id,
                     OnModel:request.query.type

                 });
                  
                 console.log("new like",newLike);
                 likeable.likes.push(newLike);
                 likeable.save();
                 
             
         }
         return response.json(200,
            {
                message:"request successful",
                data:
                {
                    deleted:deleted,
                }
            })

    }
    catch(err)
    {
        if(err)
        {   console.log("error" , err);
            return response.json('500',
            {
            message:'internal server Error',
            });
        }
    }
}
