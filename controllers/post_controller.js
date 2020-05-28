const Post=require('../models/post');
const Comment=require('../models/comment');
const Like=require('../models/like');

//action for creating a post
/*module.exports.create=function(request,response)
{
    Post.create(
        {
            content:request.body.content,
            user:request.user._id,
        }
    ,function(err,post)
    {
        if(err)
        {
            console.log("error in creating a post");
            return;

        }
        console.log("post created");
        return response.redirect('back');
    });
    console.log("hello");
}*/


//action for creating a post using async await
module.exports.create=async function(request,response)
{
    try{
  let post= await Post.create(
        {
            content:request.body.content,
            user:request.user._id,
        });
        if(request.xhr)/**********AJAX request***********/
        {
            // if we want to populate just the name of the user (we'll not want to send the password in the API), this is how we do it!
            
            post = await post.populate('user').execPopulate();//exec() is used with a query while .execPopulate() is used with a document
            return response.status(200).json(
                {
                    data:
                    {
                        post:post
                    },
                    message:"Post created!"
                }
            );
        }
        request.flash('success',"Post-published");
        return response.redirect('back');
}
catch (err)
{
    //console.log("error",err);
    request.flash('error',err);
    return response.redirect('back');
}
}






//action for deleting a post
/*module.exports.destroy=function(request,response)
{
    Post.findById(request.params.id,function(err,post)
    {    //.id means converting the object id into string
        if(post.user == request.user.id)//here we check that the user of post==user who request for deleting the post
                                        //In passport.js we can fetch the id of current user in the session via req.user.id
    // if(post)req.body has all the parameters that are sent  from the client as part of the post request to server
        {
            post.remove();
            Comment.deleteMany({post:request.params.id},function(err)
            {
                return response.redirect('back');
            })
        }
        else{
            return response.redirect('back');
        }
    })
}*/

//action for deleting a post using async await
module.exports.destroy=async function(request,response)
{
    try{
   let post= await Post.findById(request.params.id);
       //.id means converting the object id into string
        if(post.user == request.user.id)//here we check that the user of post==user who request for deleting the post
                                        //In passport.js we can fetch the id of current user in the session via req.user.id
    // if(post)req.body has all the parameters that are sent  from the client as part of the post request to server
        {   
            //delete the associated likes for the post and alls it comments likes too
            await Like.deleteMany({likeable:post,onModel:'Post'});
            await Like.deleteMany({_id:{$in:post.comments}});

            post.remove();
           await Comment.deleteMany({post:request.params.id});

           if(request.xhr)/**********AJAX request***********/
        {
            return response.status(200).json(
                {
                    data:
                    {
                        post_id:request.params.id
                    },
                    message:"Post deleted!"
                }
            );
        }

           request.flash('success','Post and its associated comments are deleted')
            
                return response.redirect('back');
            
        }
        else{
            request.flash('error',err);
            return response.redirect('back');
        }
    }
    catch(err)
    {
        //console.log("error",err);
        request.flash('error',err);
        return response.redirect('back');


    }
    
};



