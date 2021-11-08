const Post = require('../../../models/post')
const Comment = require('../../../models/comment')
module.exports.index =async function(req,res){


    let posts =await Post.find({}) // awaited to this post to b completed
    .populate('user')
    .sort('-createdAt') // sorting ny using createdAt method in MongooseDb i.e nearest
    .populate({
        path:'comments',
        populate: {
            path : 'user'
        }
});

    return res.json(200,
        {
            message : 'List of Post',
            posts : posts
        }) // whenever we need to send data we use res.json
}

// destroyng without JWT Authencation
module.exports.destroy =async function(req,res){
    try {
        let post=await Post.findById(req.params.id) // getting the id from from paran not by using query
        // putting check for authorizaion i.e am i allow to delete that post i.e if the user has make that post then only he can delete that post not onter then that user that has make that post
        //.id means converting the objet id into string
        if(post.user == req.user.id){ //we are getting user id from post schema kindly check 2.we re not using this req.user._id bacause it is not in string thereofore we hava to use req.user.id
            post.remove(); // removing the post
           await Comment.deleteMany({post: req.params.id}) // deleting all the comments by  id) 

          
           return res.json(200,{
               message:'Post and associated comment is deleted successfully'
           })

        
       }else { // if post and id donot match or unauthorized user
        return res.json(401,{
            message:'you cannot delete this post'
        });
        }    
    } catch (error) {
        console.log('Error',error)
       // return res.redirect('back') this will alos not going to work
        return res.json(500,{
            message:'Internal server Error'
        })
    }

    
    
}
