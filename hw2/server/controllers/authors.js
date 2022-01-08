const authorModel = require('../models/author');

const find = (req, res) => {
  authorModel
    .find()
    .then((authors) => {
      res.status(200).json(authors)
    })
    .catch((error) => {
      res.status(400).json({ error: error.message })
    })
}

const findOne = (req, res) => {
  const { id } = req.params;
  authorModel
    .findById(id)
    .then((author) => {
      res.status(200).json(author);
    })
    .catch((error) => {
      res.status(400).json({ error: error.message })
    })
}

const create = (req, res) => {
  const author = new authorModel(req.body)
  author
    .save()
    .then((author) => {
      res.status(200).json(author);
    })
    .catch((error) => {
      res.status(400).json({ error: error.message })
    })
}

const update = (req, res) => {
  const { id } = req.params;
  authorModel
    .updateOne({ _id: id }, req.body, function(err, result) {
      //mongoose.disconnect();
      if (err) res.status(400).send(`Author with id ${id} was NOT updated \n` + { error: error.message });
      else res.status(200).send(`Author with id ${id} was updated`);
    })
}

const remove = (req, res) => {
  const { id } = req.params;
  authorModel
    .findByIdAndDelete(id, function(err, doc) {
      if (err) {
        res.status(400).send(`Author with id ${id} was NOT deleted`);
      } else
        res.status(200).send(`Author with id ${id} was deleted`)
        // console.log(`Post with id ${id} was deleted`, doc);
    });
}

const isExists = (req, res, next) => {
  const { id } = req.params;
  authorModel.exists({ _id: id }).then(result => {
    if (!result) res.status(400).send("Author with this id does not exist")
    else next()
  });
}
module.exports = { find, findOne, create, update, remove, isExists }