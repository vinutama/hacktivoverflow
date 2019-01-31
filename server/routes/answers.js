const express = require('express')
const router = express.Router()
const AnswerController = require('../controllers/AnswerController')
const { isLogin, isAnswerOwner, isNotAnswerOwner } = require('../middlewares')

/*find all answer on specific question*/
router.get('/:questionId', AnswerController.findAll)

router.use(isLogin)

router.get('/', AnswerController.findAllMyAnswers)

/*create new answer*/
router.post('/:questionId', AnswerController.create)

/*edit answer*/
router.patch('/:id', isAnswerOwner, AnswerController.editAnswer)

/*upvote answer*/
router.post('/:id/upvotes', isNotAnswerOwner, AnswerController.upAnswer)

/*downvote answer*/
router.post('/:id/downvotes', isNotAnswerOwner, AnswerController.downAnswer)

router.post('/helpful/:id', isNotAnswerOwner, AnswerController.helpfulAnswer)

module.exports = router