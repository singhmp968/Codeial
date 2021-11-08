const Post = require("../models/post")
const User = require('../models/user')
module.exports.home =async function(req, res){ // making the function async i.e telling that the function contain some  async statement
   // return res.end('<h1>Express is up for Codeial!</h1>')
   //console.log(req.cookies) //  displayng cookies values
   //res.cookie('userId',2560)
    
//    Post.find({},function(err,posts){ // {} this will return all the post
//        if(err){console.log('err'); return}
//         //console.log('postss->',post)
//         return res.render('home',{
//         title:"odeial | Home",
//         posts:posts
//         //users:users
//         })
//     })

// here in the below function we are populating the user from User DB by using populate there is some slight change in the function writing i.e populate('user').exec() 
try{
    let posts =await Post.find({}) // awaited to this post to b completed
        .populate('user')
        .sort('-createdAt') // sorting ny using createdAt method in MongooseDb i.e nearest
        .populate({
            path:'comments',
            populate: {
                path : 'user'
            }
});
    let users =await User.find({}) // getting ths list of user to display in Ui); here we are awaited user to be completed
    // and return something to the browser;
    return res.render('home',{
        title:"Codeial | Home",
        posts:posts,
        all_users:users
        })

}catch(err){
    console.log('Error',err);    
    return;
}

}
//    return res.render('home',{
//         title:"Home"
//     })


module.exports.action = function(req,res){
    return res.end('<h1>welcomr to Action page</h1>')
}
module.exports.aboutUs = function(req,res){
    return res.end('<h1>hi man</h1>')
}

//using Then
//Post.find({}).populate('comments').then(function());
/* maiing promise like 
let posts =Post.find({}).populate('comments').exec();
posts.then();

*/