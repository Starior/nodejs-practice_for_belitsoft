const { getDb } = require('../utils/database');
var ObjectId = require('mongodb').ObjectId;

module.exports = class PostModel {
  // constructor(id, title, description) {
  //     this.id = id
  //     this.title = title
  //     this.description = description
  // }

  static find() {
    const posts = getDb();
    return posts
      .collection('posts')
      .aggregate([{
        $lookup: {
          from: 'categories',
          localField: 'categories',
          foreignField: '_id',
          as: 'categories'
        }
      }, {
        $lookup: {
          from: 'tags',
          localField: 'tags',
          foreignField: '_id',
          as: 'tags'
        }
      }, {
        $lookup: {
          from: 'authors',
          localField: 'author',
          foreignField: '_id',
          as: 'author'
        }
      }])
      .toArray()
      .then((posts) => posts)
      .catch((error) => {
        res.status(400).json({ error: error.message })
      })
  }



  static findOne(id) {
    const posts = getDb();
    return posts
      .collection('posts')
      .aggregate([{
        $match: { "_id": ObjectId(id) }
      }, {
        $lookup: {
          from: 'categories',
          localField: 'categories',
          foreignField: '_id',
          as: 'categories'
        }
      }, {
        $lookup: {
          from: 'tags',
          localField: 'tags',
          foreignField: '_id',
          as: 'tags'
        }
      }, {
        $lookup: {
          from: 'authors',
          localField: 'author',
          foreignField: '_id',
          as: 'author'
        }
      }, {
        "$match": {
          "_id": ObjectId(id)

        }
      }])
      .toArray()
      .then((post) => {
        return post[0]
      })
      .catch((error) => {
        res.status(400).json({ error: error.message })
      })

  }

  static isExists(id) {
    const posts = getDb();
    return posts
      .collection('posts')
      .findOne({ "_id": ObjectId(id) })
      .then((post) => {
        if (post) {
          return true
        } else false
      })
      .catch((error) => {
        res.status(400).json({ error: error.message })
      })

  }
}