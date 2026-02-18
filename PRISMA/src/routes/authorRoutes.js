const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');

router.post('/authors', authorController.addAuthor);
router.delete('/:id', authorController.deleteAuthor);
module.exports = router;