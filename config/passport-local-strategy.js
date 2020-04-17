const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const User=require('../models/user');

passport.use(new LocalStrategy(
    {
        usernameField:'email'
    },
    function(email,password,done)
    {
        User.findOne({email:email},function(err,user)
        {
            if(err)
            {
                console.log("error in finding user->passport");
                return done(err);
            }
            if(!user||user.password!=password)
            {
                console.log("Invalid username/password");
                return done(null,false);
            }
            return done(null,user);

        });
    }
));

//serializing the user to decide which key is to be kept in cookies

passport.serializeUser(function(user,done)
{
    done(null,user._id);
});

//deserializing the user from the key which is in cookies
passport.deserializeUser(function(id,done)
{
    User.findById(id ,function(err,user)
    {
        if(err)
        {
            console.log("error in finding user-->passport");
            return done(err);
            
        }
        return done(null,user);
    })
});

//*****************this code is used to send data of current sign-in user to views**************

//check if user is authenticated
passport.checkAuthentication=function(req,res,next)
{
    //if the user is signed in pass on the request to the next function(controller action)
    if(req.isAuthenticated()) //is Autheticated() is a method of passport which is used to check whether the user has signed-in or not
    {
        return next();
    }
    //if the user is not signed-in
    return res.redirect('/users/sign-in');
}
passport.setAuthenticatedUser=function(req,response,next)
{
    if(req.isAuthenticated())
    //req.user contains the current signed-in user from the session cookie and we are just sending this to the locals for the views
    {
    response.locals.user=req.user;//////????????????
}
next();
}