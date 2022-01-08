const express = require('express');
const postsController = require('../controllers/posts')
const router = express.Router();

// Is id Exists? 
router.use('/posts/:id', postsController.isExists);

router.get('/', postsController.find)

router.get('/posts/:id', postsController.findOne)

module.exports = router