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
    
        let existingfriend2 = await Friendship.findOne({
            from_user:req.body.friendUserId,
            to_user:req.user.id
        });
    
        console.log('existing user==>',existingfriend);
        // if exitt the we are deleting or u friend
        if(existingfriend || existingfriend2 ) {
            //console.log('existingfriend==>',existingfriend.id);
            // removing the firend from friendList fromUser
            addedAsFriend.friendship.pull(req.body.friendUserId); //
            addedAsFriend.save();
            //performig the same  removing the firend from friendList to_User
            let to_user = await User.findById(req.body.friendUserId);
            to_user.friendship.pull(req.user.id);
           to_user.save();   
            //console.log('totofrom',to_user);
            // removind existinf data from friendship table
            if(existingfriend){
            await Friendship.findByIdAndDelete(existingfriend._id);
            }else{
                await Friendship.findByIdAndDelete(existingfriend2._id);
            }
            unfriend = true;
        }
        
        else {
            console.log('creating new user arrea')
        let addNewFriend = await Friendship.create({from_user: req.user.id,
            to_user:req.body.friendUserId});
        console.log('new firendAdded', addNewFriend);
        // fetching the user and adding friendlist to from_user
        let user = await User.findById(req.user.id);
            user.friendship.push(req.body.friendUserId);
            user.save();
        // perfroming the same to add friend in the friendlist to_user
        let to_user = await User.findById(req.body.friendUserId);
            to_user.friendship.push(req.user.id);
            to_user.save();   
        }
        res.redirect('/');
    } catch (error) {
        console.log('error',error);
    }

}