// require passport
const passport = require('passport');
const User = require('../models/user')
// require localStragegt
const LocalStrategy = require('passport-local').Strategy;
// whenever local stratege is called the email and function is being called
// auth using passport
passport.use(new LocalStrategy({
    usernameField:'email', // email is comming from usse schema to identify the email
    passReqToCallback:true // thsi acctuall allow us to set first argument to true, function(req,email,password,done){ req here
},
    function(req,email,password,done){ // doen is a callback function whic is calling back to passport functin 
        // find the user and estiblished identity
        // here in findOn 1st email is the property thst we are looking in the User and 2nd onr is conninf from funtion
        User.findOne({email:email},function(err,user){
            if(err){
                console.log('error in finding the user usinf --->passport.js');
                req.flash('error',err)
                return done(err); // done takes two argument first one is error and second in wheather authentication is done or not i.e boolean
            }
            // here user.password is from user from user and password is from function
            if(!user || user.password != password){
                console.log('invalid user name and password')
                req.flash('error','invalid user name and password');
                return done(null,false); // this mean there is no error but the usr is not found basicall auth is not complete 1one null as there is no errroe and 2nd one is false as authentication is not being dome
            }
            return done(null,user); // finally when the user is find return null i.e no error and 2nd one is user 
            // the above return will be to the seralize user i.e line 33
        });
    }

));


// seralize the user to decide which key is to kept in the cookie
passport.serializeUser(function(user,done){
     done(null,user.id); // here we are storing user id in encrypted format ,this serializer will revice value from above return i.e line 24 and it wull get encrypted by using express-session from main 'index.js' 
});


// de-seralizing the user from the key in the cookie
passport.deserializeUser(function(id,done){  // passport is used to find which user is est
    User.findById(id,function(err,user){ // here we are findingthe id if it is exist in the database
        if(err){
            console.log('error in finding the user usinf --->passport.js');
            return done(err);
        }
            return done(null,user); // here at last we have found the user 
    });
});

// here we sendig data of the current user is logged -in

// check if the user is authenciaed
passport.checkAuthentication = function(req,res,next){
    // if the user is signed in the pass request to the next function i.e controllers actions
    if(req.isAuthenticated()){
        return next(); // then the user can view the page and this will pass controll to passport.setAuthenticatedUser
    }

    // if the user is not signed in
    return res.redirect('/user/sign-in')
}
passport.setAuthenticatedUser = function(req,res,next){ // here the user is being authorized to access the page
    if(req.isAuthenticated()){ // 
        // req.user containg the current signed  in user from the session cookie and we just  sending it to  locals form the views
        res.locals.user = req.user //  from here we are actull passinf data to response and we can use it in ui we are using it to makingg a post request please check 
    }
    next();
}
module.exports = passport;