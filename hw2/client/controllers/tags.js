const tagModel = require('../models/tag');

const find = (req, res) => {
  const tags = tagModel.find()
  const isPosts = false
  const isCategories = false
  const isTags = true
  const isAuthors = false
  tags
    .then((array) => {
      array.forEach(element => {
        element.created_at = element.created_at.toLocaleDateString() + " " + element.created_at.toLocaleTimeString('en-US', { hour12: false })
        element.updated_at = element.updated_at.toLocaleDateString() + " " + element.updated_at.toLocaleTimeString('en-US', { hour12: false })
      })
      res.render('home', {
        isPosts,
        isCategories,
        isTags,
        isAuthors,
        array
      });
    })
}

const findAllPostsByTag = (req, res) => {
  const { id } = req.params;
  const post = tagModel.findAllPostsByTag(id)
  post
    .then((posts) => {
      posts.forEach(element => {
        element.created_at = element.created_at.toLocaleDateString() + " " + element.created_at.toLocaleTimeString('en-US', { hour12: false })
        element.updated_at = element.updated_at.toLocaleDateString() + " " + element.updated_at.toLocaleTimeString('en-US', { hour12: false })
      })
      res.render('tags', {
        posts
      });
    })
}

const isExists = (req, res, next) => {
  const { id } = req.params;
  const post = tagModel.isExists(id)

  post.then((tag) => {
    if (tag) {
      next()
    } else {
      res.render('404', {});
    }
  })
}
module.exports = { find, findAllPostsByTag, isExists }