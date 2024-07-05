const express = require('express')
const router = express.Router()
const {
    createQuestions,
    getQuestion,
    updateQuestion,
    getQuestions,
    deleteQuestions,
    submitAnswer,
    getFinalResult,
    getscore
} = require('../controller/question.controller.js')



router.post('/', createQuestions)

router.get('/:id', getQuestion)

router.get('/', getQuestions)

router.put('/:id', updateQuestion)

router.delete('/:id', deleteQuestions)

router.post('/submit-answer', submitAnswer)

router.get('/final-result/:email', getFinalResult)

router.get('/admin/scores', getscore)



module.exports = router