const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy; //  putting OAuth2Strategy here
const crypto = require('crypto');
const User = require('../models/user');
const env = require('./enviroment');

/***
 * here we are asking google to extablishd the Identity that has been passed on i.e the one which is selected by the user.. and that particular id i.e email will
 * apper in the profile and this profile has the list of emails out of which first email value we are checking that if the user exist or not in the DB and if it doesnt exist in DB we are creating a user in DB i.e signin/signup using google
 * 
 * 
 * ****/
// telling passport to use new Strategy for google login
passport.use(new googleStrategy({  // telling passport to user object of google strategy
    // for testing we are storing here but need to store in some where while deploymenr
           /*
            clientID : "511740367557-l5d1g64grtnhmsfg6oohdh62kk407557.apps.googleusercontent.com",
            clientSecret : "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",
            callbackURL: "http://localhost:8000/user/auth/google/callback" // call-back url similar and it is comming from same call back that we have provided in google console
            */
    clientID : env.google_client_id,
    clientSecret : env.google_client_secret,
    callbackURL: env.google_call_back_URL // call-back url similar and it is comming from same call back that we have provided in google console


        },
    function(accessTOken,refreshToken,profile,done){ // this accessTOken is similar like jwt accesstoken that we were using for generating accessToken,2.refreshToken is for genetating new refresh accessToken if the access token gets expired without asking the user 
        // Find the User
        User.findOne({email:profile.emails[0].value}).exec(function(err,user){
            if(err) {console.log('eorror in google strategy passport', err); return;}
            console.log(profile)
            if(user){
                return done(null,user);
            }else{
                // if user is not present then here we are creating the user
                //if user not found  create the user and set it as req.user //req.user i.e sign in the user
                User.create({
                    name : profile.displayName,
                    email : profile.emails[0].value,
                    password : crypto.randomBytes(20).toString('hex') // this is for generating random string
                }, function(err,user){
                    if(err) {console.log('eorror in creating user using google strategy passport', err); return;}
                    return done(null,user);
                })
            
            }
        
        });

    }
));


module.exports = passport; // exporting the passport value