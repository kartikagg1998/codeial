const passport=require('passport');
const googleStrategy=require('passport-google-oauth').Oauth2Strategy;
const crypto=require('./crypto');
const User=require('../models/user');

//tell passport to use a new strategy for login
passport.use(new googleStrategy(
    {
        clentId:"967144459178-c5lktvsesvj8j27imqpu390v16rtkhkt.apps.googleusercontent.com",
        clientSecret:"ll2YWngy-bCC3KYsU-7oRdWT",
        callbackURL:"http://localhost:8000/users/auth/google/callback"
    },
    function(accessToken ,refreshToken,profile,done)
        {
            //find a user
            User.findOne({email:profile.emails[0].value}).exec(function (err,user)
            {
                if(err)
                {
                    console.log("error in google-starategy-passport",err);
                    return;
                }
                console.log(profile);
                if(user)
                //if found set this user as req.user
                {
                    return done(null,user);
                }
                else{
                    //if not found,create the user and set it as req.user
                User.create(
                    {
                       name:profile.displayName,
                       email:profile.emails[0].value,
                       password:crypto.randomBytes(20).toString('hex')
                    },function (err,user)
                       {
                           if(err)
                           {
                            console.log("error in creating user google-starategy-passport",err);
                            return;
                           }
                           return done(null,user);
                       }
                        );         


            }});
        }
));
module.exports=passport;
        