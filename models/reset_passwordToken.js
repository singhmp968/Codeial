const mongoose = require('mongoose');

const restPasswordSchema = new mongoose.Schema({
    user :{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User' // refering to user schema
    },
    accessToken : {
        type: String

    },
    isValid : {
        type: Boolean,
        default: true
    }

},{
    timestamps:true
})
const ResetPassword = mongoose.model('ResetPassword',restPasswordSchema);
module.exports = ResetPassword