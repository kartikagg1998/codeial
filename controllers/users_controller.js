const User=require('../models/user');
module.exports.profile=function(request,response)
 {
    //response.end('<h1>Users profile page</h1>');
    User.findById(request.params.id,function(err,user){
    return response.render('./user_profile',
    {
       'title':'users profile',
       profile_user:user,


    });
   });
 }

//update user profile
 module.exports.update=function(request,response)
    {
       if(request.user.id==request.params.id){
       //User.findByIdAndUpdate(request.params.id,request.body,function(err,user) //or
       User.findByIdAndUpdate(request.params.id,{name:request.body.name,email:request.body.email},function(err,user)
       {
          return response.redirect('back');

         })
      }
      else{
         return response.status(401).send('Unauthorized');
      }
    }

//render the signup page
 module.exports.signUp=function(request,response)
 {
    if(request.isAuthenticated())
    {
       return response.redirect('/users/profile');
    }
    return response.render('./user_sign_up',
    {
       'title':'user signup',
    });
    }
//render the signin page
    module.exports.signIn=function(request,response)
 {
   if(request.isAuthenticated())
   {
      return response.redirect('/users/profile');
   }
    return response.render('./user_sign_in',
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
       return response.redirect('/');
    }
    module.exports.destroySession=function(request,response)
    {
       request.logout();
       return response.redirect('/');
    }

    module.exports.post=function(request,response)
    {
       return response.redirect('/');
    }

    