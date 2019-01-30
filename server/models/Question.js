const mongoose = require('mongoose')
const Schema = mongoose.Schema

const QuestionSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title must be filled!']
  },
  description: {
    type: String,
    required: [true, 'Description must be filled!']
  },
  upvotes: [
    { type: Schema.Types.ObjectId, ref: `User` }
  ],
  downvotes: [
    { type: Schema.Types.ObjectId, ref: `User` }
  ],
  point: {
    type: Number,
    default: 0
  },
  owner: {
    type: Schema.Types.ObjectId, ref: `User`
  },
  tags: [],
  createdAt: {
    type: Date,
    default: new Date()
  },
  updatedAt: {
    type: Date,
    default: new Date()
  }
})

const Question = mongoose.model('Question', QuestionSchema)

module.exports = Question