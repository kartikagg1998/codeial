const mongoose=require('mongoose');
const postSchema=new mongoose.Schema(
    {
        content:
        {
            type:String,
            required:false,
        },
        user:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'User', ///The ref tells the name of schema to which we refer
        },
        comments:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Comment',//wait can you tell me why sir not use Comment here
        }],
        comments:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref:'Comment',//wait can you tell me why sir not use Comment here
            }],
            likes:[
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref:'Like',//wait can you tell me why sir not use Comment here
                }]
        },
        {
            timestamps:true,
        }
);
const Post=mongoose.model('Post',postSchema);
module.exports=Post;