const tagModel = require('../models/tag');

const find = (req, res) => {
  tagModel
    .find()
    .then((tag) => {
      res.status(200).json(tag)
    })
    .catch((error) => {
      res.status(400).json({ error: error.message })
    })
}

const findOne = (req, res) => {
  const { id } = req.params;
  tagModel
    .findById(id)
    .then((tag) => {
      res.status(200).json(tag);
    })
    .catch((error) => {
      res.status(400).json({ error: error.message })
    })
}

const create = (req, res) => {
  const tag = new tagModel(req.body)
  tag
    .save()
    .then((tag) => {
      res.status(200).json(tag);
    })
    .catch((error) => {
      res.status(400).json({ error: error.message })
    })
}

const update = (req, res) => {
  const { id } = req.params;
  tagModel
    .updateOne({ _id: id }, req.body, function(err, result) {
      //mongoose.disconnect();
      if (err) res.status(400).send(`Tag with id ${id} was NOT updated`);
      else res.status(200).send(`Tag with id ${id} was updated`);
    })
}

const remove = (req, res) => {
  const { id } = req.params;
  tagModel
    .findByIdAndDelete(id, function(err, doc) {
      if (err) res.status(400).send(`Tag with id ${id} was NOT deleted`);
      else res.status(200).send(`Tag with id ${id} was deleted`)
    });
}

const isExists = (req, res, next) => {
  const { id } = req.params;
  tagModel.exists({ _id: id }).then(result => {
    if (!result) res.status(400).send("Tag with this id does not exist")
    else next()
  });
}

module.exports = { find, findOne, create, update, remove, isExists }