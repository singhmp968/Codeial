const Like = require('../models/like');
const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.toggleLike =async function(req,res){
    try {
        // we are making liek as like this
        // Likes.toggle/id=abcdef&type=Post
        let likeable;
        let deleted = false;
        // if our query is Post then our likable will become post
        if(req.query.type == 'Post'){
            likeable = await Post.findById(req.query.id).populate('likes');// redo imp populating likes from post 
        }else {
            // else out likeale will become comment
            likeable = await Comment.findById(req.query.id).populate('likes');// redo imp populating likes from post

        }

        // check if the like already exist
        let existingLike = await Like.findOne({
            likeable: req.query.id,
            onModel: req.query.type,
            user: req.user._id
        });
        // if the like already exist then delete it 
        if(existingLike){
            likeable.likes.pull(existingLike._id); // pulling like from the array 
            likeable.save(); // saving the likes
            existingLike.remove(); //removinf the existing like
            deleted = true;
        }else {
            // else make a new like
            let newLike = await Like.create({ // one user cn liek just one object at once
                user: req.user._id,
                likeable: req.query.id,
                onModel: req.query.type // definginthe type of like i.e post or comment
            });
           // likeable.likes.push(like._id);
            likeable.likes.push(newLike);
            likeable.likes.push(newLike._id);
            
            likeable.save(); // saving the likeable

        }

        return res.json(200,{
            message:"Request successfuk",
            data: {
                deleted: deleted // value of deleted T or F
            }
        })
    } catch (error) {
        console.log(error);
        return res.json(500,{
            message : 'Internal Server Error'
        });
    }
}