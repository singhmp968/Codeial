// this is similar to index to main index
const express = require('express');
const router = express.Router();

router.use('/posts',require('./posts'));
router.use('/users',require('./users'));

module.exports = router;