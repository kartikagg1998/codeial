
const development=
{
    name:'development',
    asset_path:'./assets',
    session_cookie_key:'blahsomething',
    db:'codeial_development',
    smtp:{ service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: 'akartik1998@gmail.com',
        pass: 'subhash@1998'
    }},
    google_client_id:"967144459178-c5lktvsesvj8j27imqpu390v16rtkhkt.apps.googleusercontent.com",
    google_client_secret:"ll2YWngy-bCC3KYsU-7oRdWT",
    google_callback_url:"http://localhost:8000/users/auth/google/callback",
    jwt_secret:'codeial',
}

const production=
{
    name:'Production',
    asset_path:process.env.CODEIAL_ASSET_PATH,
    session_cookie_key:process.env.CODEIAL_SESSION_COOKIE_KEY,
    db:process.env.CODEIAL_DB,
    smtp:{ service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user:process.env.CODEIAL_GMAIL_USERNAME,
        pass:process.env.CODEIAL_GMAIL_PASSWORD,
    }},
    google_client_id:process.env.CODEIAL_GOOGLE_CLIENT_ID,
    google_client_secret:process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
    google_callback_url:process.env.CODEIAL_GOOGLE_CALLBACK_URL,
    jwt_secret:process.env.CODEIAL_JWT_SECRET,
}


module.exports=eval(process.env.NODE_ENV)==undefined ?development :eval(process.env.NODE_ENV);