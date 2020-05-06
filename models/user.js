const mongoose=require('mongoose');
const multer=require('multer');
const path=require('path');
const AVATAR_PATH=path.join('uploads/users/avatars');
const userSchema= new mongoose.Schema(
    {
        email:
        {
            type:String,
            required:true,
            unique:true
        },
        password:
        {
            type:String,
            required:true,
        },
        name:
        {
            type:String,
            required:true,
        },
        avatar:
        {
            type:String,
        }
    },
        {
            timestamps:true,
        }
    
)

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,path.join('_dirname','..',AVATAR_PATH));
    },
    filename: function (req, file, cb) {  //we use filename in case if two files have same name so we attach date with time in miiliseconds ff creation of date
      cb(null, file.fieldname + '-' + Date.now())
    }
  })

//static methods
userSchema.statics.uploadedAvatar=multer({storage:storage}).single('avatar');//uploadedAvatar is a funcytion
userSchema.statics.avatarPath=AVATAR_PATH;

const User=mongoose.model('User',userSchema);
module.exports=User;