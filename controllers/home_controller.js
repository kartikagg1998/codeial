
const Post=require('../models/post');
module.exports.home=function(request,response)
{
    console.log(request.cookies);
    response.cookie('user_id',20);

    //response.end('<h1>Express is up for codeial</h1>');
     /*Post.find({},function(err,post)
    {
        if(err)
       {
           console.log("error in fetching post from database");
            return;
       }
        return response.render('home',{
            title:'home',
         postContent:post,
        });
      });*/

Post.find({}).populate('user').exec(function(err,posts)
{
    if(err)
    {
        console.log("error in fetching post from database");
        return;
    }
    return response.render('home',{
        title:'home',
     postContent:posts,
    });
  });
   
}


