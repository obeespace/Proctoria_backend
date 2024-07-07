import { Router } from 'express'

const router = Router();

import Controller from './controller.js';


router.post('/', Controller.createQuestions)

router.get('/:id', Controller.getQuestion)

router.get('/', Controller.getQuestions)

router.put('/:id', Controller.updateQuestion)

router.delete('/:id', Controller.deleteQuestions)

router.post('/submit-answer', Controller.submitAnswer)

router.get('/final-result/:email', Controller.getFinalResult)

router.get('/admin/scores', Controller.getScore)



export default router