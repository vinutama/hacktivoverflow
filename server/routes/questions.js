const express = require('express')
const router = express.Router()
const QuestionController = require('../controllers/QuestionController')
const { isLogin, isNotQuestionOwner, isQuestionOwner } = require('../middlewares')

/*get all questions*/
router.get('/', QuestionController.findAll)

/*question detail*/
router.get('/:id', QuestionController.findOne)

router.use(isLogin)

/*find my questions*/
router.get('/own/list', QuestionController.findMyQuestions)

/*create question*/
router.post('/', QuestionController.create)

/*delete question*/
router.delete('/:id', isQuestionOwner, QuestionController.deleteQuestion)

/*edit question*/
router.patch('/:id', isQuestionOwner, QuestionController.editQuestion)

/*upvote question*/
router.post('/:id/upvotes', isNotQuestionOwner, QuestionController.upQuestion)

/*downvote question*/
router.post('/:id/downvotes', isNotQuestionOwner, QuestionController.downQuestion)

/*find tagged questions*/
router.get('/tagged/:tag', QuestionController.findFilteredQuestion)

module.exports = router