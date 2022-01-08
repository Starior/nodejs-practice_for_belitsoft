const express = require('express')

const tagsController = require('../controllers/tags');
const router = express.Router()

// Is id Exists? 
router.use('/tags/:id', tagsController.isExists);

// get all authors
router.get('/tags', tagsController.find);

// get single author by id
router.get('/tags/:id', tagsController.findOne);

// create a new author
router.post('/tags', tagsController.create);

// update author by id
router.patch('/tags/:id', tagsController.update);

// delete author by id 
router.delete('/tags/:id', tagsController.remove);

module.exports = router