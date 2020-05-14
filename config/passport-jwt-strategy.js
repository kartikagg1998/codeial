const passport =require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;//this module is used to extract jwt from header

const User=require('../models/user');

let  opts = {
jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),//in header there is key authentication in which there is bearer key
secretOrKey:'codeial'}//used for encryption or decryption of token

passport.use(new JwtStrategy(opts,function(jwtPayload,done)//jwtpayload contains all infornation of user(name,password,token lifetime..)
{                                                          //done is a callback function
    User.findById(jwtPayload._id,function(err,user)
    {
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