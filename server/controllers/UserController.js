const User = require('../models/User')
const kue = require('kue')
const queue = kue.createQueue()
const { comparePassword, generateToken } = require('../helpers')

module.exports = {
  register: function (req, res) {
    let newUser = req.body
    newUser.avatar = req.file.cloudStoragePublicUrl
    User
      .create(newUser)
      .then((user) => {
        let emailJob = queue.create('email', {
          title: `Welcome to Hacktiv Overflow 8`,
          email: user.email,
          template: `<h1> Welcome ${user.name}, Thanks for Register to our website!</h1><br>
                     <a href="/login">Login here</a>`
        })
        emailJob.save(err => {
          if (err) {
            console.log(err)
          } else {
            console.log('sending email')
          }
        })
        res.status(201).json(user)
      })
      .catch(err => {
        err = err.errors
        if(err.hasOwnProperty('name')) {
          res.status(400).json(err.name.message)
        } else if (err.hasOwnProperty('email')) {
          res.status(400).json(err.email.message)
        } else if (err.hasOwnProperty('password')) {
          res.status(400).json(err.password.message)
        } else {
          res.status(500).json({
            message: err.message
          })
        }
      })
  },
  login: function (req, res) {
    User
      .findOne({ email: req.body.email })
      .then(user => {
        if(user) {
            if(comparePassword(req.body.password, user.password)) {
                let token = generateToken({
                    name: user.name,
                    email: user.email
                })
                res.status(200).json({
                    token: token,
                    name: user.name,
                    email: user.email,
                    birthday: user.birthday,
                    avatar: user.avatar,
                    tags: user.tags
                })
            } else {
                res.status(400).json({
                    msg: `Wrong Email/Password`
                })
            }
        } else {
            res.status(400).json({
                msg: `Wrong Email/Password`
            })
        }
      })
      .catch(err => {
        res.status(500).json({
        msg: `Internal Server Error`
      })
    })
  },
  watchTags: function (req, res) {
    let input = req.body.tags
    let watchedTags = {}
    watchedTags.name = input
    User
      .findOneAndUpdate({ _id: req.currentUser._id }, {$push: {tags: watchedTags}}, {new: true})
      .then(tags => {
        res.status(200).json(tags)
      })
      .catch(err => {
        res.status(500).json({
          message: err.message
        })
      })
  },
  findOne: function(req, res) {
    User
        .findOne({ _id: req.currentUser._id })
        .then(user => {
            res.status(200).json({
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                _id: user._id,
                tags: user.tags
            })
        })
        .catch(err => {
            res.status(500).json({
                msg: `Internal server error`
            })
        })
},
}