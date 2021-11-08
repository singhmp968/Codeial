const express = require('express');
const router = express.Router();
const assignApi = require('../../../controllers/api/v2/assign_api');
router.get('/',assignApi.index) // calling index modules
module.exports = router;