import { Router } from 'express'

const router = Router();

import QuestionController from '../controller/question.controller.js';


router.post('/', QuestionController.createQuestions)

router.get('/:id', QuestionController.getQuestion)

router.get('/', QuestionController.getQuestions)

router.put('/:id', QuestionController.updateQuestion)

router.delete('/:id', QuestionController.deleteQuestions)

router.post('/submit-answer', QuestionController.submitAnswer)

router.get('/final-result/:email', QuestionController.getFinalResult)

router.get('/admin/scores', QuestionController.getscore)



export default router