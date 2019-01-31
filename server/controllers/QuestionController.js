const Question = require('../models/Question')
const Tag = require('../models/Tag')

module.exports = {
  create: function (req, res) {
    let input = req.body.tags
    let newTags = []
    input.forEach(val => {
      let newTag = {}
      newTag.name = val
      newTags.push(newTag)
    })
    let newQuestion = {
      title: req.body.title,
      description: req.body.description,
      owner: req.currentUser._id,
      tags: newTags
    }
    Question
      .create(newQuestion)
      .then(question => {
        res.status(201).json(question)
      })
      .catch(err => {
        res.status(500).json({
          message: err.message
        })
      })    
  },
  findOne: function (req, res) {
    Question
      .findOne({ _id: req.params.id })
      .populate('owner')
      .then(question => {
        res.status(200).json(question)
      })
      .catch(err => {
        res.status(500).json({
          message: err.message
        })
      })
  },
  findAll: function (req, res) {
    Question
      .find({})
      .populate('owner')
      .sort('-updatedAt')
      .then(questions => {
        res.status(200).json(questions)
      })
      .catch(err => {
        res.status(500).json({
          message: err.message
        })
      })
  },
  deleteQuestion: function (req, res) {
    Question
      .findOneAndDelete({ _id: req.params.id })
      .then(() => {
        res.status(200).json({
          message: `Successfully deleted this question!`
        })
      })
      .catch(err => {
        res.status(500).json({
          message: err.message
        })
      })
  },
  editQuestion: function (req, res) {
    let editQuestion = {...req.body}
        editQuestion.updatedAt = new Date()
    Question
      .findOneAndUpdate({ _id: req.params.id }, editQuestion, { new: true, runValidators: true })
      .then(question => {
        res.status(200).json(question)
      })
      .catch(err => {
        err = err.errors
        if (err.hasOwnProperty('title')) {
          res.status(400).json(err.title.message)
        } else if (err.hasOwnProperty('description')) {
          res.status(400).json(err.description.message)
        } else {
          res.status(500).json({
            message: err.message
          })
        }
      })
  },
  upQuestion: function (req, res) {
    Question
      .findOne({ _id: req.params.id })
      .populate('owner')
      .then(question => {
        let filterUp = question.upvotes.filter(val => {
          return String(val._id) === String(req.currentUser._id) 
        })
        let filterDown = question.downvotes.filter(val => {
          return String(val._id) === String(req.currentUser._id)
        })
        if (!filterUp.length && !filterDown.length) {
          return Question
                  .findOneAndUpdate({ _id: req.params.id }, {$push: {upvotes: req.currentUser._id}, $inc: {point: +1}}, { new: true })       
                  .populate('owner')  
        } 
        else if (filterUp.length && !filterDown.length) {
          return Question
                  .findOneAndUpdate({ _id: req.params.id}, {$pull: {upvotes: req.currentUser._id}, $inc: {point: -1}}, { new: true })
                  .populate('owner')
        }
        else if (!filterUp.length && filterDown.length) {
          return Question
                  .findOneAndUpdate({ _id: req.params.id }, {$pull: {downvotes: req.currentUser._id}, $push: {upvotes: req.currentUser._id}, $inc: {point: +1}}, { new: true })
                  .populate('owner')
        }
        else {
          res.status(400).json({
            message: `You already upvotes this question`
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
  downQuestion: function (req, res) {
    Question
      .findOne({ _id: req.params.id })
      .populate('owner')
      .then(question => {
        let filterUp = question.upvotes.filter(val => {
          return String(val._id) === String(req.currentUser._id)
        })
        let filterDown = question.downvotes.filter(val => {
          return String(val._id) === String(req.currentUser._id)
        })
        if (!filterDown.length && !filterUp.length) {
          return Question
                  .findOneAndUpdate({ _id: req.params.id }, {$push: {downvotes: req.currentUser._id}, $inc: {point: -1}}, { new: true })
                  .populate('owner')
        }
        else if (filterDown.length && !filterUp.length) {
          return Question
                  .findOneAndUpdate({ _id: req.params.id }, {$pull: {downvotes: req.currentUser._id}, $inc: {point: +1}}, { new: true })
                  .populate('owner')
        }
        else if (!filterDown.length && filterUp.length) {
          return Question
                  .findOneAndUpdate({ _id: req.params.id }, {$pull: {upvotes: req.currentUser._id}, $push: {downvotes: req.currentUser._id}, $inc: {point: -1}}, { new: true })
                  .populate('owner')
        } else {
          res.status(400).json({
            message: `You already downvotes this question!`
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
  findMyQuestions: function (req, res) {
    Question
      .find({ owner: req.currentUser._id })
      .populate('owner')
      .populate('upvotes')
      .populate('downvotes')
      .then(questions => {
        res.status(200).json(questions)
      })
      .catch(err => {
        res.status(500).json({
          message: err.message
        })
      })
  },
  findFilteredQuestion: function (req, res) {
    Question
      .find({'tags.name': req.params.tag})
      .populate('owner')
      .then(questions => {
        res.status(200).json(questions)
      })
      .catch(err => {
        res.status(500).json({
          message: err.message
        })
      })
  }
}