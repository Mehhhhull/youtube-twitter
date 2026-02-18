const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

router.post('/add-new-book',bookController.addBook);
router.get('/get-all-books',bookController.getAllBooks);
router.get('/:id',bookController.getBookById)
router.put('/:id',bookController.updateBook)
router.delete('/:id',bookController.deleteBook)

module.exports=router