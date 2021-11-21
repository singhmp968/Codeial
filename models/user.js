const mongoose = require('mongoose');
const multer  = require('multer');
const path = require('path')
const AVATAR_PATH = path.join('/uploads/users/avatars');
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    avatar : {
        type:String
    },
    // inorder to have super fast access
    friendship: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Friendship'
        }
    ]
  
},  {
        timestamps:true // this fild is for tracking created and udated time checking
    });

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,path.join(__dirname,'..',AVATAR_PATH))
    },
    filename: function (req, file, cb) {
        //const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + Date.now());
    }
});

// static 
userSchema.statics.uploadedAvatar = multer({storage:storage}).single('avatar') // attaching diskoingStorage with userSchema '.single('avatar')'-> this says only one instance is attached at a time not multiple files
userSchema.statics.avatarPath = AVATAR_PATH // providing AVATAR_PATH to be global access userShema model 
const User = mongoose.model('User',userSchema);
module.exports = User;