const mongoos = require('mongoose')


const postSchema = new mongoos.Schema({
    content:{
        type:String,
        required:true
    },
    user: { // here we are actull creating a reference to the user schema i.e whatever post is created it will be refered to the user schema
            type : mongoos.Schema.Types.ObjectId , // here we are refering to object id
            ref : 'User' //  here we refering t user Schema 
    
        },
        // include the ids of all comment i the post schema itself
    comments : [
        {
            type : mongoos.Schema.Types.ObjectId , // here we are refering to object id
            ref : 'Comment' 
        }
    ],
    // making a array tomake query fase
    likes : [
        {
            type : mongoos.Schema.Types.ObjectId , // here we are refering to object id
            ref : 'Like' // refering to likes
        }
    ]
},{
    timestamps:true
});
const  Post  = mongoos.model('Post',postSchema);
module.exports = Post