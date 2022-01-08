const express = require('express');
const categoriesController = require('../controllers/categories')
const router = express.Router();

// Is id Exists?   
router.use('/category/:id', categoriesController.isExists);

router.get('/category', categoriesController.find)

router.get('/category/:id', categoriesController.findAllPostsByCategory)

module.exports = router