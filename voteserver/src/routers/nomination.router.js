const express = require('express');
const nominationController = require('../controllers/nomination.controller');
const router = express.Router();


router.post('/', nominationController.create);
router.get('/', nominationController.findAll);
router.get('/full', nominationController.findAllWithCandidates);
router.get('/:id', nominationController.findById);
router.put('/:id', nominationController.update);
router.delete('/:id', nominationController.delete);
router.post('/updateOrder', nominationController.updateOrder);
module.exports = router;
