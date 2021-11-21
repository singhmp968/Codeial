const Friendship = require('../models/friendship');
const User = require('../models/user');
module.exports.addFriends =async function(req,res) {
    console.log('@@@ friend ship post',req.body.friendUserId);
    console.log('from user = ',req.user.id);
  
    try {
        let addedAsFriend = await User.findById(req.user.id);
        console.log('addedasfriend',addedAsFriend)
        let unfriend=false;
        // checking if the user already exist as friend
        let existingfriend = await Friendship.findOne({
            from_user:req.user.id,
            to_user:req.body.friendUserId
        });
        console.log('existing user==>',existingfriend);
        // if exitt the we are deleting or u friend
        if(existingfriend) {
            console.log('existingfriend==>',existingfriend.id);
            // removing the firend
            addedAsFriend.friendship.pull(req.body.friendUserId);
            addedAsFriend.save();
            // removind existinf data from friendship table
            await Friendship.findByIdAndDelete(existingfriend._id);
            unfriend = true;
        }else {
            console.log('creating new user arrea')
        let addNewFriend = await Friendship.create({from_user: req.user.id,
            to_user:req.body.friendUserId});
        console.log('new firendAdded', addNewFriend);
        // fetching the user
        let user = await User.findById(req.user.id);
            user.friendship.push(req.body.friendUserId);
            user.save();
        }
        res.redirect('/');
    } catch (error) {
        console.log('error',error);
    }

}