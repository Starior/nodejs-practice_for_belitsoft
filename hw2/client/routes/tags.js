const express = require('express');
const tagsController = require('../controllers/tags')
const router = express.Router();

// Is id Exists?   
router.use('/tag/:id', tagsController.isExists);

router.get('/tag', tagsController.find)

router.get('/tag/:id', tagsController.findAllPostsByTag)

module.exports = router