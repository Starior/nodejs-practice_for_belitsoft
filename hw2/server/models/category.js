const mongoose = require('mongoose');

const Schema = mongoose.Schema

const schema = new Schema({
  name: { type: String, required: true },
  excerpt: String,
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

module.exports = mongoose.model('Category', schema)