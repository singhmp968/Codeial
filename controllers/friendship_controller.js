const Friendship = require('../models/friendship');
const User = require('../models/user');
module.exports.addFriends =async function(req,res) {
    console.log('@@@ friend ship post',req.body.friendUserId);
    console.log('from user = ',req.user.id);
  
    try {
        let addNewFriend = await Friendship.create({from_user: req.user.id,to_user:req.body.friendUserId});
        console.log('new firendAdded', addNewFriend);
        // fetching the user
        let user = await User.findById(req.user.id);
            user.friendship.push(req.body.friendUserId);
            user.save();
        
        res.redirect('/');
    } catch (error) {
        console.log('error',error);
    }

}