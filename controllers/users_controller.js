const User=require('../models/user');
const fs=require('fs');
const path=require('path');
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
 module.exports.update= async function(req,res)
    {
      //  if(request.user.id==request.params.id){
      //  //User.findByIdAndUpdate(request.params.id,request.body,function(err,user) //or
      //  User.findByIdAndUpdate(request.params.id,{name:request.body.name,email:request.body.email},function(err,user)
      //  {
      //     return response.redirect('back');

      //    })
      // }
      // else{
      //    return response.status(401).send('Unauthorized');
      // }

      if(req.user.id==req.params.id)
      {
         try{
            let user= await User.findById(req.params.id);
             User.uploadedAvatar(req,res,function(err)
             {
                if(err){
                console.log('******MulterError:',err);}
                
             

             user.name=req.body.name;
             user.email=req.body.email;

             if(req.file)
             {
                  if(user.avatar)
                  {
                    fs.unlinkSync(path.join(__dirname , '..' , user.avatar));
                 }
                //this is just saving the path of the uploaded file into the avatar field in the user
                user.avatar=User.avatarPath+'/'+req.file.filename;
             }
             user.save();
             return res.redirect('back');

            });
         }
         
      
         catch(err){
            request.flash('error',err);
            return res.redirect('back');
         }
      }
      else{
         req.flash('error',Unauthorized);
         return res.status(401).send('Unauthorized');
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

    //sign in and create a session for the user
    module.exports.create_session=function(request,response)
    {
       request.flash('success','Logged in successfully');//req.flash() function  can be used for flash messages.
       return response.redirect('/');
    }


    
    module.exports.destroySession=function(request,response)
    {
       request.logout();
       request.flash('error',"You have logged out successfully");//req.flash() function can be used for flash messages.
       return response.redirect('/');
    }

    module.exports.post=function(request,response)
    {
       return response.redirect('/');
    }

    module.exports.forgotPassword=function(request,response)
    {
       
      return response.render('./forgot-password',
      {
         'title':'Forgot-password',
      });
      }

      module.exports.resetPassword=function(request,response)
      {
         if(request.body.password!=request.body.confirm_password)
         {
            return response.redirect("./forgot-password");
         }
         console.log(request.body.password);
         console.log(request.body.confirm_password);
         User.findOneAndUpdate({email:request.body.Email},function(err,user){
         if(err)
         {
            console.log("error in finding user");
         }
         if(user)
         {
            console.log("password changes");
            user.password=request.body.password;
            console.log("password changes");
         }
      })
      }
