const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');//crypto library is used to generate random password
const User=require('../models/user');

//tell passport to use a new(google) strategy for login
passport.use(new googleStrategy(
    {
        clientID:"967144459178-c5lktvsesvj8j27imqpu390v16rtkhkt.apps.googleusercontent.com",
        clientSecret:"ll2YWngy-bCC3KYsU-7oRdWT",
        callbackURL:"http://localhost:8000/users/auth/google/callback",
    },
    //here we ask google to establish the identity of user whose info is provided in profile
    function(accessToken ,refreshToken,profile,done)//refresh token helps to generate access token again when access token expires
        {
            //find a user
            User.findOne({email:profile.emails[0].value}).exec(function (err,user)
            {
                if(err)//if user enter wrong email or password when sign in to google
                {
                    console.log("error in google-starategy-passport",err);
                    return;
                }
                console.log(accessToken ,refreshToken);
                console.log(profile);
                if(user)
                //if found set this user as req.user
                {
                    return done(null,user);
                }
                else{
                    //if not found,create the user and set it as req.user
                User.create(     //signup
                    {
                       name:profile.displayName,
                       email:profile.emails[0].value,
                       password:crypto.randomBytes(20).toString('hex')
                    },function (err,user)
                       {
                           if(err)   //if there is duplicate value of email or any other error
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
        