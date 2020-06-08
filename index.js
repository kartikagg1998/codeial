const express=require('express');
const env=require("./config/environment");
const logger=require('morgan');
const cookieParser=require('cookie-parser');
const app=express();
require('./config/view-helpers')(app);
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

//setting up chat server to be used with socket.io
const chatServer=require('http').Server(app);
const chatSockets=require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log("charserver is listening on port 5000");

const path=require('path');

if(env.name =='development'){
app.use(sassMiddleware(
    {
        src:path.join(__dirname,env.asset_path,'scss'),
        dest:path.join(__dirname,env.asset_path,'css'),
        debug:true,
        outputStyle:'extended',
        prefix:'/css'
    }
));
}

app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static(env.asset_path));
//make the uploads path available to the browser
app.use('/uploads',express.static(__dirname+'/uploads'));

app.use(logger(env.morgan.mode,env.morgan.options));

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
        secret:env.session_cookie_key,//the key which is used to encode and decode
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