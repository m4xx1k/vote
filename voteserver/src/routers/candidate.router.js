const express = require('express');
const candidateController = require('../controllers/candidate.controller');
const multer = require('multer');
const router = express.Router();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './photos/candidates');
    },
    filename: function (req, file, cb) {
        cb(null, `${Math.random()}`.split('.')[1] + '.' + file.originalname.split('.').slice(-1));
    }
})


const upload = multer({storage});


router.post('/', upload.single('photo'), candidateController.create);
router.get('/', candidateController.findAll);
router.get('/nomination/:id/names', candidateController.candidateNamesByNomination);
router.get('/candidatesByNomination/:id', candidateController.candidateByNomination);
router.get('/:id', candidateController.findById);
router.put('/:id', upload.single('photo'), candidateController.update);
router.delete('/:id', candidateController.delete);

module.exports = router;
