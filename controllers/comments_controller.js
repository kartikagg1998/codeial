const Comment=require("../models/comment");
const Post=require("../models/post");
module.exports.create=function(request,response)
{
    Post.findById(request.body.post,function(err,post) //we store id of post in post in form
    {   
        if(post)  {    
            Comment.create(
        {
            content:request.body.content,
            post:request.body.post,
            user:request.user._id,
           
        },function(err,comment)
    {
    // if(err)
    // {
    //     console.log("error occurs in adding comment to the post");
    //     return;
    // }
    post.comments.push(comment);
    post.save();
    response.redirect('back');
});
        }
});
}
module.exports.destroy=function(request,response)
{
    Comment.findById(request.params.id,function(err,comment)
    {
        if(comment.user == request.user.id||post.user)
        //if(comment)
        {   let postId=comment.post;
            comment.remove();
           
               Post.findByIdAndUpdate(postId,{$pull: {comments:request.params.id}},function(err,post){
            //here pull is used to find the comment id from comments array(of posts) which is in request.params.id
            return response.redirect('back');
        })}
        else{
            return response.redirect('back');
        }
    })
}