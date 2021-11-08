const express = require('express');
const router = express.Router();
const games_controlle = require('../controllers/gemes_controller');
router.get('/play',games_controlle.games)
module.exports = router;