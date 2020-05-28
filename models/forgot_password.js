const mongoose=require('mongoose');
const forgotPasswordSchema=new mongoose.Schema(
    {
        
        user:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'User', ///The ref tells the name of schema to which we refer
        },
        accessToken:
        {
            type:String,
            required:true,///The ref tells the name of schema to which we refer
        },
        isValid:
        {
            type:Boolean,
        }
    },
        {
            timestamps:true,
        }
);
const ForgotPassword=mongoose.model('Post',forgotPasswordSchema);
module.exports=ForgotPassword;