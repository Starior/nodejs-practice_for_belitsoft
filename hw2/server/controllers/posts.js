const postModel = require('../models/post');

const find = (req, res) => {
  postModel
    .find()
    .populate('categories tags author')
    .then((posts) => {
      res.status(200).json(posts)
    })
    .catch((error) => {
      res.status(400).json({ error: error.message })
    })
}

const findOne = (req, res) => {
  const { id } = req.params;
  postModel
    .findById(id)
    .populate('categories tags author')
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      res.status(400).json({ error: error.message })
    })
}

const create = (req, res) => {
  const post = new postModel(req.body)
  post
    .save()
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      res.status(400).json({ error: error.message })
    })
}

const update = (req, res) => {
  const { id } = req.params;
  postModel
    .updateOne({ _id: id }, req.body, function(err, result) {
      //mongoose.disconnect();
      if (err) res.status(400).send(`Post with id ${id} was NOT updated`);
      else res.status(200).send(`Post with id ${id} was updated`);
    })
}

const remove = (req, res) => {
  const { id } = req.params;
  postModel
    .findByIdAndDelete(id, function(err, doc) {
      if (err) res.status(400).send(`Post with id ${id} was NOT deleted`);
      else res.status(200).send(`Post with id ${id} was deleted`)
    });
}

const isExists = (req, res, next) => {
  const { id } = req.params;
  postModel.exists({ _id: id }).then(result => {
    if (!result) res.status(400).send("Post with this id does not exist")
    else next()
  });
}

module.exports = { find, findOne, create, update, remove, isExists }