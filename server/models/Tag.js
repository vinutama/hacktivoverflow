const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TagSchema = new Schema({
  name: {
    type: String
  }
})

const Tag = mongoose.model('Tag', TagSchema)

module.exports = Tag