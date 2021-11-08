const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy; // here we are importing JWT Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt // // this module will help us in extracting JWT module
const User = require('../models/user');
const env = require('./enviroment')
let opts = {
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(), // header is a list of key and it has a key called Authorization and it is also a list of key and in whick it has a key called Bearer
    secretOrKey : env.jwt_secret, // this is our encryption and decryption key and every encryption goes through this and decryption happen beacause of this


}
//@@$$## here the user is already present we are just checking that the user is present or not
passport.use(new JWTStrategy(opts,function(jwtPayload,done){ //jwtPayload is for getting the payloads
    // find the user based on the information of JwtPayload similar to local-Stratergy where we are finding the user 
    User.findById(jwtPayload._id,function(err,user){
        if(err){console.log('error user is not found',err); return}
        // user is found
        if(user){
            return done(null,user); // null for no error is found
        }else {
            return done(null,false)
        }
    });
    
}));
module.exports = passport; 
