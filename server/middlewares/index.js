const User = require('../models/User')
const { verifyToken } = require('../helpers')
const Question = require('../models/Question')
const Answer = require('../models/Answer')

module.exports = {
    isLogin: function(req, res, next) {
        let token = req.headers.token
        if(token) {
            let decoded = verifyToken(token)
            User
                .findOne({ email: decoded.email })
                .then(user => {
                    if (user) {
                        req.currentUser = {
                            _id: user._id,
                            name: user.name,
                            email: user.email,
                            birthday: user.birthday
                        }
                        next()
                    } else {
                        res.status(401).json({
                            message: `Unauthorized user`
                        })
                    }
                })
                .catch(err => {
                    res.status(500).json({
                        message: `Internal server error`
                    })
                })
        } else {
            res.status(401).json({
                message: `Unauthorized user`
            })
        }
    },
    isQuestionOwner: function (req, res, next) {
        Question
            .findOne({ _id: req.params.id })
            .then(question => {
                if (String(question.owner._id) === String(req.currentUser._id)) {
                    next()
                } else {
                    res.status(401).json({
                        message: `Invalid Access!`
                    })
                }
            })
            .catch(err => {
                res.status(500).json({
                    message: err.message
                })
            })
    },
    isNotQuestionOwner: function (req, res, next) {
        Question
            .findOne({ _id: req.params.id })
            .then(question => {
                if (String(question.owner._id) !== String(req.currentUser._id)) {
                    next()
                } else {
                    res.status(401).json({
                        message: `You Cannot Upvote/Downvote on your own question!`
                    })
                }
            })
            .catch(err => {
                res.status(500).json({
                    message: err.message
                })
            })
    },
    isAnswerOwner: function (req, res, next) {
        Answer
            .findOne({ _id: req.params.id })
            .then(answer => {
                if (String(answer.owner._id) === String(req.currentUser._id)) {
                    next()
                } else {
                    res.status(401).json({
                        message: `Invalid Access!`
                    })
                }
            })
            .catch(err => {
                res.status(500).json({
                    message: err.message
                })
            })
    },
    isNotAnswerOwner: function (req, res, next) {
        Answer
        .findOne({ _id: req.params.id })
        .then(answer => {
            if (String(answer.owner._id) !== String(req.currentUser._id)) {
                next()
            } else {
                res.status(401).json({
                    message: `You Cannot Upvote/Downvote on your own answer`
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            })
        })
    }
}