const postModel = require('../models/post');

const find = (req, res) => {
  const isPosts = true
  const isCategories = false
  const isTags = false
  const isAuthors = false
  const posts = postModel.find()
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

const findOne = (req, res) => {
  const { id } = req.params;
  const post = postModel.findOne(id)
  post
    .then((post) => {
      res.render('postPage', {
        post
      });
    }).catch((error) => {
      res.status(400).json({ error: error.message })
    })
}

const isExists = (req, res, next) => {
  const { id } = req.params;
  const post = postModel.isExists(id)

  post.then((post) => {
    if (post) {
      next()
    } else {
      res.render('404', {});
    }
  })
}

module.exports = { find, findOne, isExists }