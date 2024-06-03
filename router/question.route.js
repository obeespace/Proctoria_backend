const express = require('express')
const router = express.Router()
const {
    createQuestions,
    getQuestion,
    updateQuestion,
    getQuestions,
    deleteQuestions
} = require('../controller/question.controller.js')



router.post('/', createQuestions)

router.get('/:id', getQuestion)

router.get('/', getQuestions)

router.put('/:id', updateQuestion)

router.delete('/:id', deleteQuestions)

module.exports = router