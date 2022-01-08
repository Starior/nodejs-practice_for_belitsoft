const categoryModel = require('../models/category');

const find = (req, res) => {
  const posts = categoryModel.find()
  const isPosts = false
  const isCategories = true
  const isTags = false
  const isAuthors = false
  posts
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

const findAllPostsByCategory = (req, res) => {
  const { id } = req.params;
  const post = categoryModel.findAllPostsByCategory(id)
  post
    .then((posts) => {
      posts.forEach(element => {
        element.created_at = element.created_at.toLocaleDateString() + " " + element.created_at.toLocaleTimeString('en-US', { hour12: false })
        element.updated_at = element.updated_at.toLocaleDateString() + " " + element.updated_at.toLocaleTimeString('en-US', { hour12: false })
      })
      res.render('categories', {
        posts
      });
    })
}

const isExists = (req, res, next) => {
  const { id } = req.params;
  const post = categoryModel.isExists(id)

  post.then((category) => {
    if (category) {
      next()
    } else {
      res.render('404', {});
    }
  })
}
module.exports = { find, findAllPostsByCategory, isExists }