const mongoose=require('mongoose');
const likeSchema= new mongoose.Schema(

    {
        user:
        {
            type:mongoose.Schema.ObjectId

        },
        //this define the object id of the liked object
        likeable:
        {
            type:mongoose.Schema.ObjectId,
            required:true,
            refPath:'OnModel'//on which type of object like is marked

        },
        //this field is used for defining the type of likedobject as dynamic refernce
        OnModel:
        {
            type:String,
            required:true,
            enum:['Post','Comment']//this tell like can be made on only post or comment
        }

    },
    {
    
        timestamps: true,
    }
);
const Like=mongoose.model('Like',likeSchema);
module.exports=Like;

//testing k liye