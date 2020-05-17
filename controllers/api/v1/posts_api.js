const Post=require('../../../models/post');
const Comment=require('../../../models/comment');
const User=require('../../../models/user');
module.exports.index= async function(req,res)
{

    let posts = await Post.find({}).sort('-createdAt')
            .populate('user')
            .populate({         //nested population
                path: 'comments',
                populate: {
                    path: 'user'
                }
            });
    return res.json(200,{
    message:"list of posts",
    posts:posts
})
}

//for deleting post 

module.exports.destroy=async function(request,response)
{
    try{
   let post= await Post.findById(request.params.id);
        console.log(request.user);
            if(post.user==request.user.id){
          post.remove();
           await Comment.deleteMany({post:request.params.id});

          return response.json(200,
            {
                message:"post and its associated comments are deleted"
            });
           
        }
        //post delete nhi ho rha
        //authorization  check krne do
    else{
        return response.json(401,
            {
                message:"You cannot delete this post",
            });
    }}
    catch(err)
    {
        console.log("*****error",err);
       return response.json(500,
        {
            message:"Internal server Error"
        })

    }
    
};