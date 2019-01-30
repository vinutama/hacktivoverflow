const express = require('express')
const router = express.Router()
const TagController = require('../controllers/TagController')

/*find all tags*/
router.get('/', TagController.findAll)

module.exports = router