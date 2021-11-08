// this is similar to post rutes
const express = require('express');
const router = express.Router();
const passport = require('passport');
const postApi = require('../../../controllers/api/v1/post_api');

router.get('/',postApi.index);
// authencating post requst after jwt token is generate 
router.delete('/:id',passport.authenticate('jwt', {session: false}),postApi.destroy); // {session: false beacause at this time we dont want to generate session cookies and this will put authencation check
module.exports = router;