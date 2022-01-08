const { getDb } = require('../utils/database');
var ObjectId = require('mongodb').ObjectId;

module.exports = class TagModel {
  // constructor(id, title, description) {
  //     this.id = id
  //     this.title = title
  //     this.description = description
  // }

  static find() {
    const tags = getDb();
    return tags
      .collection('tags')
      .find()
      .toArray()
      .then((tags) => tags)
  }

  static findAllPostsByTag(id) {
    const posts = getDb();
    return posts
      .collection('posts')
      .aggregate([{
          $match: { tags: ObjectId(id) }
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
        }
        // ,
        // {
        //   $unwind: "$tags"
        // },
        // {
        //   $match: { "tags._id": ObjectId(id) }
        // }
      ])
      .toArray()
      .then((posts) => {
        return posts
      })
  }

  static findOne(id) {
    const inx = id
    const posts = getDb();
    return posts
      .collection('tags')
      .findOne({ "_id": ObjectId(id) })
      .then((post) => {
        // console.log(post)
        return post
      })
  }

  static isExists(id) {
    const posts = getDb();
    return posts
      .collection('tags')
      .findOne({ "_id": ObjectId(id) })
      .then((post) => {
        if (post) {
          return true
        } else false
      })
  }
}