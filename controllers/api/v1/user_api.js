
const User = require('../../../models/user')
const jwt = require('jsonwebtoken') ; // imorting jsonwebtoken and used for generating jsonwebtoken
const env = require('../../../config/enviroment')

// here we are creating session i.e handling signin page for the user
module.exports.createSession =async function(req,res){
    try {
        let user = await User.findOne({email: req.body.email}); 
        // checking password is corercrt
        if(!user || user.password != req.body.password) {
            return res.json(422,{ // 422 is for invalid input
                message:'Invalid username or password'
            });
        }
            return res.json(200,{
                message :'Sign in successful, here is token ,please keep it safe',
                data :{
                   // token : jwt.sign(user.toJSON(),'codeial',{expiresIn: 100000}) // user.toJSON() this is the part which get encrypted
                   token : jwt.sign(user.toJSON(),env.jwt_secret,{expiresIn: 100000}) // user.toJSON() this is the part which get encrypted
                    
                
                }
            });
            
        
    } catch (error) {
        console.log('error=>',error);
        return res.json(500,{
            message:'Internal server Error'
        })
    }
}