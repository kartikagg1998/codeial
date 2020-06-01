
const Post=require('../models/post');
const User=require('../models/user');
/*module.exports.home=function(request,response)
{
    console.log(request.cookies);
    response.cookie('user_id',20);

    //response.end('<h1>Express is up for codeial</h1>');
    //  Post.find({},function(err,post)
    // {
    //     if(err)
    //    {
    //        console.log("error in fetching post from database");
    //         return;
    //    }
    //     return response.render('home',{
    //         title:'home',
    //      postContent:post,
    //     });
    //   });

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
   
}*/

//using async await

module.exports.home = async function (request, response) {
    try {
        let posts = await Post.find({}).sort('-createdAt')
            .populate('user')
            .populate({         //nested population
                path: 'comments',
                populate: {
                    path: 'user'
                },
                populate: {
                    path: 'likes'
                }
                
            })
            .populate('likes')
            
            let users = await User.find({});
        let user;
        if(request.user){
              user = await User.findById(request.user._id)
             .populate({
                     path : "friends",
                     populate : {
                        path : "from_user",//why u popuale both from user and to user , because friends can be both from as well as to(we dont know that us that is person that is signed in is to user or from user )
                    }                      // from locals.user we know about this who signed in i think haa bt vo toh vahaa locals mei jake pta lgega ejs file mei..yha hmei dono krne pdenge populate okk
                 })//tumne jb friendhip object bnaya .usko user ki friends array mei kr diya tha add?haa ..dono users ki?pta nhi check krlo
                 .populate({
                    path : "friends",
                    populate : {
                       path : "to_user"
                   }
                });
            
            
        }

        console.log(user);

      
            return response.render('home', {
                title: 'home',
                postContent: posts,
                all_users: users,
                user : user
            });
        
    }
    catch (err) {
        console.log("error", err);
    }

}



