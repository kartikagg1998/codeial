
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
    name:'production',
}


module.exports=development;