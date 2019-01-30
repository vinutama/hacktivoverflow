const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AnswerSchema = new Schema({
  content: {
    type: String,
    required: [true, 'Content must be filled!']
  },
  owner: {
    type: Schema.Types.ObjectId, ref: `User`
  },
  question: {
    type: Schema.Types.ObjectId, ref: `Question`
  },
  upvotes: [
    { type: Schema.Types.ObjectId, ref: `User` }
  ],
  downvotes: [
    { type: Schema.Types.ObjectId, ref: `User`}
  ],
  point: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: new Date()
  },
  updatedAt: {
    type: Date,
    default: new Date()
  },
})

const Answer = mongoose.model('Answer', AnswerSchema)

module.exports = Answer