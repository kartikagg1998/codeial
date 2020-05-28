const mongoose=require('mongoose');
const commentSchema=new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    // comment belong to the user
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    },
    likes:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Like",//wait can you tell me why sir not use Comment here
        }]
    
},{
    timestamps:true

});

const Comment=mongoose.model('Comment',commentSchema);
module.exports=Comment;