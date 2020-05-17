const express=require('express');
const cookieParser=require('cookie-parser');
const app=express();
const port=8000;
const expressLayouts=require('express-ejs-layouts');
const db=require("./config/mongoose");
//used for session cookie
const session=require('express-session');
const passport=require('passport');//passport libray is used for authentication
const passportLocal=require('./config/passport-local-strategy');//we use local startegy of passport 
const passportJWT=require('./config/passport-jwt-strategy');

const googleStrategy=require('./config/passport-google-oauth-strategy');
const MongoStore=require('connect-mongo')(session);
const sassMiddleware=require('node-sass-middleware');//this mddleware is used for converting scss ino css
const flash=require('connect-flash');
const customMiddleware=require('./config/middleware');

app.use(sassMiddleware(
    {
        src:"./assets/scss",
        dest:"./assets/css",
        debug:true,
        outputStyle:'extended',
        prefix:'/css'
    }
));

app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static('./assets'));
//make the uploads path available to the browser
app.use('/uploads',express.static(__dirname+'/uploads'));
app.use(expressLayouts);

//extract styles and scripts from sub pages(like profile user signin signup..........) into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// //use express router
// app.use('/',require('./routes'));

app.set('view engine','ejs');
app.set('views','./views');

//a middleware which takes the session cookie and encrypt it
 app.use(session(
    {
        name:'codeial',//name of cookie
        secret:'blahsomething',//the key which is used to encode and decode
        saveUninitialized:false,
        resave:false,
        cookie:
        {
            maxAge:(1000*100*60)//it decide for how much time cookie is valid
        },
         store:new MongoStore(
            {
                mongooseConnection:db,
                 autoRemove:'disabled',

             },
            function(err)
            {
                console.log(err||"connect mongo-db setup ok")
             }
        )
    }
    ));
    
    app.use(passport.initialize());//we tell app to use passport
    app.use(passport.session());
    app.use(passport.setAuthenticatedUser);

app.use(flash());//flash messages are stored in sessions
app.use(customMiddleware.setFlash);//this middleware is used to excess messages in ejs/html file

//use express router
app.use('/',require('./routes'));


app.listen(port,function(err)
{
    if(err)
   
    {
       // console.log("error",err);
        console.log(`error in running the server:${err}`);
        return;
    }
    console.log(`Server is running on port:${port}`);
})