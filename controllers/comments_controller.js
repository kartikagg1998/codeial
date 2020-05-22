const Comment=require("../models/comment");
const Post=require("../models/post");
const commentsMailer= require("../mailers/comments_mailer");
const queue=require("../config/kue");
const commentEmailWorker=require("../workers/comment_email_worker");
/*module.exports.create=function(request,response)
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
}*/

//using async await
module.exports.create=async function(request,response)
{
    try{
   let post=await Post.findById(request.body.post)//we store id of post in post in form
     
        if(post)  {    
         let comment= await Comment.create(
        {
            content:request.body.content,
            post:request.body.post,
            user:request.user._id,
           
        });
        post.comments.push(comment);
     post.save();
     comment= await comment.populate('user','name email').execPopulate();
     console.log(comment)
    // commentsMailer.newComment(comment);
    //instead of controller now we use worker (email)to send emails after publishing new comment
    let job=queue.create('emails',comment).save(function(err){ // here we put job into the queue
        if(err)
        {
            console.log('error in creating a queue',err);
            return;
        }
        console.log('job enqueued',job.id);
    })
   

        if(request.xhr)/**********AJAX request***********/
        {
        //    comment= await comment.populate('user','name').execPopulate();
            return response.status(200).json(
                {
                    data:
                    {
                        comment:comment,
                    },
                    message:"comment created!"
                }
            );
        }
    // if(err)
    // {
    //     console.log("error occurs in adding comment to the post");
    //     return;
    // }
     
    request.flash('success',"Comment is published");
    response.redirect('back');
};
        }
        catch(err)
        {
            request.flash('error',err);
            //console.log("error",err);
        }

};
/*module.exports.destroy=function(request,response)
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
        })
    }
        else{
            return response.redirect('back');
        }
   })
}*/

module.exports.destroy=async function(request,response)
{
    try{
   let comment= await Comment.findById(request.params.id);
        if(comment.user == request.user.id||post.user)
        //if(comment)
        {   let postId=comment.post;
            comment.remove();
           
              await Post.findByIdAndUpdate(postId,{$pull: {comments:request.params.id}});
            //here pull is used to find the comment id from comments array(of posts) which is in request.params.id

            // send the comment id which was deleted back to the views   /**********AJAX request***********/
            if (request.xhr){
                return response.status(200).json({
                    data: {
                        comment_id: request.params.id
                    },
                    message: "Comment deleted"
                });
            }
            request.flash('success',"Comment is removed from post");
            return response.redirect('back');
        }

        else{
            request.flash('error',err);
            return response.redirect('back');
        }
    }
    catch(err)
    {
        request.flash('error',err);
        //console.log("error",err);
    }
    
}