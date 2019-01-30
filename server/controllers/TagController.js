const Tag = require('../models/Tag')

module.exports = {
  findAll: function (req, res) {
    Tag
      .find({})
      .then(tags => {
        res.status(200).json(tags)
      })
      .catch(err => {
        res.status(400).json({
          message: err.message
        })
      })
  }
}