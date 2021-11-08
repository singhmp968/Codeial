const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
    content: {
        type:String,
        required:true
    },
    user : {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    post : {
        type:mongoose.Schema.Types.ObjectId,
        ref : 'Post'
    },
    // creating a array of likes to make query fast
    likes : [
        {
            type : mongoose.Schema.Types.ObjectId , // here we are refering to object id
            ref : 'Like'
        }
    ]
},{
    timestamps:true
})
const Comment = mongoose.model('Comment',commentSchema);
module.exports = Comment;