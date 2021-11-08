const express = require('express');
const router = express.Router();
const passport = require('passport')
const userController = require('../controllers/users_controller');
const userost = require('../controllers/users_controller')
const usignup = require('../controllers/users_controller')
router.get('/profile/:id',passport.checkAuthentication,userController.profile);
router.post('/update/:id',passport.checkAuthentication,userController.update);
router.get('/post',userost.userPost);
router.get('/sign-up',userController.signUp)
router.get('/sign-in',userController.signin)
router.post('/create',userController.create)
// this will takes 3 argument 3 one will be middle ware i.e passport to authincate
router.post('/create-session',passport.authenticate( // authenticate is an inbuilt function
    'local', // we put local beacause our strategy is local i.e passport-local strategy
    {failureRedirect:'/user/sign-in'}
) ,userController.createSession )
module.exports = router; // sending it to main index.js file

router.get('/sign-out',userController.destroySession)

// router for google authentication
router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));  //('google',{scope} for google strategy scope i.e scope:['profile','email'] is part of information whic is provided
// similar to line 14 to 17 check
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/user/sign-in'}),userController.createSession) // similar to passport .authenciate local

// section for implementing forgot password logic
router.post('/forget_passwordEmailSec',userController.forget_passwordEmailSec)
router.get('/forgetPassword',userController.forgetPassword)

router.get('/reset_password/',userController.reset_password)
router.post('/forget_updata_password/',userController.forget_updata_password);

// creting user-post by my own need to dele
//router.post('/make-post',passport.checkAuthentication,userController.makePost)