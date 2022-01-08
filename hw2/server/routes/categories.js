const express = require('express')

const categoriesController = require('../controllers/categories');
const router = express.Router()

// Is id Exists? 
router.use('/categories/:id', categoriesController.isExists);

// get all posts
router.get('/categories', categoriesController.find);

// get single post by id
router.get('/categories/:id', categoriesController.findOne);

// create a new post
router.post('/categories', categoriesController.create);

// update post by id
router.patch('/categories/:id', categoriesController.update);

// delete post by id 
router.delete('/categories/:id', categoriesController.remove);

module.exports = router