const express = require('express');
const userController = require('../controllers/user.controller');
const router = express.Router();


router.post('/', userController.create);
router.get('/isNewUser', userController.isNewUser);
router.get('/range', userController.findUsersInRange);

module.exports = router;
