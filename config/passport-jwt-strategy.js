const passport =require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;//this module is used to extract jwt from header

const User=require('../models/user');
const env=require('./environment');

let  options = { //options is an object literal containing options to control how the token is extracted from the request or verified.
jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),//jwtFromRequest tells the strategy from where should it get the jwt that has to be decoded in order to grant authorization to the user
secretOrKey:env.jwt_secret}//used for encryption or decryption of json web token

passport.use(new JwtStrategy(options,function(jwtPayload,done)//jwtpayload contains all infornation of user(name,password,token lifetime..)
{                                  
    console.log(options);                        //done is a callback function
    User.findById(jwtPayload._id,function(err,user)
    {
        console.log(user,"jwt");
        if(err)
        {
            console.log("error in finding user from jwt");
            return;
        }
        if(user)
        {
            return done(null,user);
        }
        else{
            return done(null,false);
        }
    })
}));