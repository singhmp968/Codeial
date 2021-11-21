const mongoose =require('mongoose');
const friendshipSchema = new mongoose.Schema({
    // it is the one who sent the request
    // sender
    from_user: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    // reciver
    // to user is the one who accept the request
    to_user: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},{
    timestamps: true
})
const Friendship = mongoose.model('Friendship',friendshipSchema);
module.exports = Friendship;