//require library
const mongoose=require('mongoose');
//connect momgoose with database
mongoose.connect('mongodb://localhost/codeial_development');// connect is function
//acquire the connection(to check if it is successful)
const db=mongoose.connection;
db.on('error', console.error.bind(console, 'error connecting to db'));
db.once('open', function()
{
    console.log("successfully connected to database::MongoDB");
});
module.exports=db;