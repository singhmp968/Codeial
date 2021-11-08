const Post = require('../models/post');
const Comment = require('../models/comment');
module.exports.create =async function(req,res){
   // console.log(req.user); // need to understand properly
   try {
    let post = await  Post.create({
        content:req.body.content,
        user:req.user._id // this user is omming from app.use(passport.setAuthenticatedUser)
    });
    let userDet =await Post.findOne({user:req.user._id}).populate('user').exec(); // populating username from post
    //post = await Post.populate('user', 'name').execPopulate(); // sending a new way IMP!!!!!
    
   //console.log('--->',userDet.user.name);
    if(req.xhr){ // checking if the request is AJAx request
        return res.status(200).json({  // retutning status ->200 to res
            data : {
                post:post,  // this post is from   let post = await  Post.create({
                userName : userDet.user.name
            },
            message : 'post created' // this is ageneral method to send JSOn Data by sending a message
        }) 
    }
    req.flash('success','Post Published!');
    return res.redirect('back')
       
   } catch (error) {
    req.flash('error',error);
    console.log('Error',error) ;
    return res.redirect('back');
   }
    
}

module.exports.destroy =async function(req,res){
    try {
        let post=await Post.findById(req.params.id) // getting the id from from paran not by using query
        // putting check for authorizaion i.e am i allow to delete that post i.e if the user has make that post then only he can delete that post not onter then that user that has make that post
        //.id means converting the objet id into string
        if(post.user == req.user.id){ //we are getting user id from post schema kindly check 2.we re not using this req.user._id bacause it is not in string thereofore we hava to use req.user.id
            post.remove(); // removing the post
           await Comment.deleteMany({post: req.params.id}) // deleting all the comments by  id) 

            if(req.xhr){
                return res.status(200).json({
                    data: {
                        post_id : req.params.id
                    },
                    message : 'post deleted successfully'
                })
            }
           req.flash('success','Post and associated deleted');
          
           return res.redirect('back')

        
        }else { // if post and id donot match
            req.flash('success','error you cannot delete this post');
            return res.redirect('back')
        }    
    } catch (error) {
        req.flash('error',error);
        console.log('Error',error)
        return res.redirect('back')
    }

    
    
}
