const User=require('../models/user');
module.exports.profile=function(request,response)
 {
    //response.end('<h1>Users profile page</h1>');
    response.render('./user_profile',
    {
       'title':'users profile',
    });
 }
//render the signup page
 module.exports.signUp=function(request,response)
 {
    response.render('./user_sign_up',
    {
       'title':'user signup',
    });
    }
//render the signin page
    module.exports.signIn=function(request,response)
 {
    response.render('./user_sign_in',
    {
       'title':'user signin',
    });
    }
    module.exports.create=function(request,response)
    {
      if(request.body.password!=request.body.confirm_password)
      {
         return response.redirect('back');
      }
      User.findOne({email:request.body.Email},function(err,user)
      {
         if(err)//we are checking if a user already exist corresponding to the current email ...we donot create duplicate entry
         {
            console.log("error in finding user in signing up");return;
         }
         if(!user)
         {
            User.create(request.body,function(err,user)
            {
               if(err)
               {
                  console.log("error in crete user while signing up");
                  return;
               }
               return response.redirect('/users/sign-in');
            })
         }
         else{         ///if user is already exist
            return response.redirect('back');
         }
      });
   }

    
    module.exports.create_session=function(request,response)
    {
       
    }