const express = require('express');
const voteController = require('../controllers/vote.controller');
const router = express.Router();


router.post('/', voteController.vote);
router.get('/', voteController.check);

module.exports = router;
