const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');
const walletController = require('../controllers/walletController');
const authController = require('../controllers/authController');

router.post('/login', authController.login);
router.get('/wallet/:username', walletController.getWallet);
router.post('/wallet/:username/update', walletController.updateWallet);
router.get('/game/start', gameController.startGame);

module.exports = router;
