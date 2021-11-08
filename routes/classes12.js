const express = require('express');
const router = express.Router();
const classs_controller =require('../controllers/class_controller');
router.get('/cttc',classs_controller.cltc);
module.exports=router;