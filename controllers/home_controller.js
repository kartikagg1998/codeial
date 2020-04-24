
const Post=require('../models/post');
const User=require('../models/user');
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

//populate the user of each post
Post.find({})
.populate('user')
//.populate('comments')
 .populate({         //nested population
    path:'comments',
     populate:{
         path:'user'
     }
 })
.exec(function(err,posts)
{
    // if(err)
    // {
    //     console.log("error in fetching post from database");
    //     return;
    // }
    User.find({},function(err,users)
    {
        return response.render('home',{
            title:'home',
         postContent:posts,
         all_users:users,
        });  
    });
    
  });
   
}


