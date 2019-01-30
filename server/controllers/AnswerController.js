const Answer = require('../models/Answer')

module.exports = {
  create: function (req, res) {
    let newAnswer = {
      content: req.body.content,
      owner: req.currentUser._id,
      question: req.params.questionId
    }
    Answer
      .create(newAnswer)
      .then(answer => {
        res.status(201).json(answer)
      })
      .catch(err => {
        err = err.errors
        if(err.hasOwnProperty('content')) {
          res.status(400).json(err.content.message)
        } else {
          res.status(500).json({
            message: err.message
          })
        }
      })
  },
  findAll: function (req, res) {
    Answer
      .find({ question: req.params.questionId })
      .populate('owner')
      .sort('-updatedAt')
      .then(answers => {
        res.status(200).json(answers)
      })
      .catch(err => {
        res.status(500).json({
          message: err.message
        })
      })
  },
  editAnswer: function (req, res) {
    let editAnswer = req.body
    editAnswer.updatedAt = new Date()
    Answer
      .findOneAndUpdate({ _id: req.params.id }, editAnswer, { new: true })
      .then(answer => {
        res.status(200).json(answer)
      })
      .catch(err => {
        res.status(500).json({
          message: err.message
        })
      })
  },
  upAnswer: function (req, res) {
    Answer
      .findOne({ _id: req.params.id })
      .then(answer => {
        let filterUp = answer.upvotes.filter(val => {
          return String(val._id) === String(req.currentUser._id)
        })
        let filterDown = answer.downvotes.filter(val => {
          return String(val._id) === String(req.currentUser._id)
        })
        if (!filterUp.length && !filterDown.length) {
          return Answer
                  .findOneAndUpdate({ _id: req.params.id }, {$push: {upvotes: req.currentUser._id}, $inc: {point: +1}}, { new: true })
        }
        else if (filterUp.length && !filterDown.length) {
          return Answer
                  .findOneAndUpdate({ _id: req.params.id }, {$pull: {upvotes: req.currentUser._id}, $inc: {point: -1}}, { new: true })
        }
        else if (!filterUp.length && filterDown.length) {
          return Answer
                  .findOneAndUpdate({ _id: req.params.id }, {$push: {upvotes: req.currentUser._id}, $pull: {downvotes: req.currentUser._id},$inc: {point: +1}}, { new: true })
        } 
        else {
          res.status(400).json({
            message: `You already vote this answer`
          })
        }
      })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        res.status(500).json({
          message: err.message
        })
      })
  },
  downAnswer: function (req, res, next) {
    Answer
      .findOne({ _id: req.params.id })
      .populate('owner')
      .then(answer => {
        let filterUp = answer.upvotes.filter(val => {
          return String(val._id) === String(req.currentUser._id)
        })
        let filterDown = answer.downvotes.filter(val => {
          return String(val._id) === String(req.currentUser._id)
        })
        if (!filterDown.length && !filterUp.length) {
          return Answer
                  .findOneAndUpdate({ _id: req.params.id }, {$push: {downvotes: req.currentUser._id}, $inc: {point: -1}}, { new: true })
        }
        else if (filterDown.length && !filterUp.length) {
          return Answer
                  .findOneAndUpdate({ _id: req.params.id }, {$pull: {downvotes: req.currentUser._id}, $inc: {point: +1}}, { new: true })
        }
        else if (!filterDown.length && filterUp.length) {
          return Answer
                  .findOneAndUpdate({ _id: req.params.id }, {$pull: {upvotes: req.currentUser._id}, $push: {downvotes: req.currentUser._id}, $inc: {point: -1}}, { new: true })
        } else {
          res.status(400).json({
            message: `You already downvotes this answer!`
          })
        }
      })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        res.status(500).json({
          message: err.message
        })
      })
  }
}