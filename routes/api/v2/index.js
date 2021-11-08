// this is similar to index to main index
const express = require('express');
const router = express.Router();

router.use('/assign',require('./assign'));
module.exports = router;