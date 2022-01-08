const categoryModel = require('../models/category');

const find = (req, res) => {
  categoryModel
    .find()
    .then((categories) => {
      res.json(categories)
    })
    .catch((error) => {
      res.status(400).json({ error: error.message })
    })
}

const findOne = (req, res) => {
  const { id } = req.params;
  categoryModel
    .findById(id)
    .then((category) => {
      res.status(200).json(category);
    })
    .catch((error) => {
      res.status(400).json({ error: error.message })
    })
}

const create = (req, res) => {
  const post = new categoryModel(req.body)
  post
    .save()
    .then((category) => {
      res.json(category);
    })
    .catch((error) => {
      res.status(400).json({ error: error.message })
    })
}

const update = (req, res) => {
  const { id } = req.params;
  categoryModel
    .updateOne({ _id: id }, req.body, function(err, result) {
      //mongoose.disconnect();
      if (err) return console.log(err);
      res.status(200).send(`Category with id ${id} was updated`);
    })
}

const remove = (req, res) => {
  const { id } = req.params;
  categoryModel
    .findByIdAndDelete(id, (err, doc) => {
      if (err) {
        return console.log(err);
      } else
        res.status(200).send(`Category with id ${id} was deleted`)
    });
}

const isExists = (req, res, next) => {
  const { id } = req.params;
  categoryModel.exists({ _id: id }).then(result => {
    if (!result) res.status(400).send("Category with this id does not exist")
    else next()
  });
}
module.exports = { find, findOne, create, update, remove, isExists }