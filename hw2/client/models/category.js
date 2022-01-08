const { getDb } = require('../utils/database');
var ObjectId = require('mongodb').ObjectId;

module.exports = class CategoryModel {
  // constructor(id, title, description) {
  //     this.id = id
  //     this.title = title
  //     this.description = description
  // }
  static find() {
    const categories = getDb();
    return categories
      .collection('categories')
      .find()
      .toArray()
      .then((categories) => categories)
  }

  static findAllPostsByCategory(id) {
    const posts = getDb();
    return posts
      .collection('posts')
      // .find({
      //   categories: ObjectId(id)
      // })
      .aggregate([{
          $match: { categories: ObjectId(id) }
        },
        {
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
        },

        // {
        //   $in: [ObjectId(id), "categories"]
        // }

        // {
        //   $unwind: "$categories"
        // },
        // {
        //   $match: { categories: id }
        // }

        // {
        //   $filter: {
        //     input: "$categories",
        //     as: "category",
        //     cond: { $in: [ObjectId(id), "$categories"] }
        //   }
        // }
      ])
      // .find({
      //   categories: ObjectId(id)
      // })



    .toArray()
      .then((posts) => {
        // console.log(posts)
        return posts
      })
  }

  static isExists(id) {
    const posts = getDb();
    return posts
      .collection('categories')
      .findOne({ "_id": ObjectId(id) })
      .then((post) => {
        if (post) {
          return true
        } else false
      })
  }


  // static findOne(id) {
  //   // console.log(id)
  //   const inx = id
  //   const posts = getDb();
  //   // console.log(posts)
  //   return posts
  //     .collection('categories')
  //     .findOne({ "_id": ObjectId(id) })
  //     .then((post) => {
  //       // console.log(post)
  //       return post
  //     })
  //     // .catch((error) => {
  //     //   res.status(400).json({ error: error.message })
  //     // })

  // }

}