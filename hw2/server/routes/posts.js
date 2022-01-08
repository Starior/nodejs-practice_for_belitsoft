const express = require('express')

const postsController = require('../controllers/posts');
const router = express.Router()

// Is id Exists? 
router.use('/posts/:id', postsController.isExists);

// get all posts
router.get('/posts', postsController.find);

// get single post by id
router.get('/posts/:id', postsController.findOne);

// create a new post
router.post('/posts', postsController.create);

// update post by id
router.patch('/posts/:id', postsController.update);

// delete post by id 
router.delete('/posts/:id', postsController.remove);

module.exports = router