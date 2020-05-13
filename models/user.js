const mongoose=require('mongoose');
//import multer
const multer=require('multer');
const path=require('path');
const AVATAR_PATH=path.join('/uploads/users/avatars');
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
        avatar: //in database we only store path of file which comtain profile picture
        {
            type:String,
        }
    },
        {
            timestamps:true,
        }
    
)

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,path.join('__dirname','..',AVATAR_PATH));//this is used to reach to users path in uploads
    },
    filename: function (req, file, cb) {  //we use filename in case if two files have same name so we attach date with time in miiliseconds ff creation of date
      cb(null, file.fieldname + '-' + Date.now())//file.fieldname fetch avatar as name in database
    
    }
  })

//static methods
userSchema.statics.uploadedAvatar=multer({storage:storage}).single('avatar');//uploadedAvatar is a function
userSchema.statics.avatarPath=AVATAR_PATH;//here we declare path as static so it available publically

const User=mongoose.model('User',userSchema);
module.exports=User;