const Question = require('../models/questionModel.js')

const createQuestions = async (req, res) => {
    try {
        if (!req.body.question || !req.body.answerOne || !req.body.answerTwo || !req.body.answerThree || !req.body.answerFour || !req.body.correctAnswer){
          return res.status(400).send({message: "Kindly input all required fields"})
        }
        const question = await Question.create(req.body)
        res.status(200).json(question)
    
      } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
      }
}

const getQuestion = async (req, res) => {
    try {
        const {id} = req.params
        const question = await Question.findById(id)
        res.status(200).json(question)
        
      } catch (error) {
        res.status(500).json({message: error.message})
      }
}

const updateQuestion = async (req, res) => {
    try {
        const {id} = req.params
        const question = await Question.findByIdAndUpdate(id, req.body)
        if (!question){
          return res.status(404).json({Message: "Question not found!"})
        }
        const updatedBook = await Question.findById(id)
        res.status(200).json(updatedBook)
      } catch (error) {
        res.status(500).json({message: error.message})
      }
}

const getQuestions = async (req, res) => {
    try {
        const questions = await Question.find({})
        res.status(200).json(questions)
      } catch (error) {
        res.status(500).json({message: error.message})
      }
}

const deleteQuestions = async (req, res) => {
    try {
        const {id} = req.params
        const question = await Question.findByIdAndDelete(id)
        if(!question) {
          return res.status(404).json({message: "Question not found!"})
        }
    
        res.status(200).json({message: "Question successfully deleted"})
      } catch (error) {
        res.status(500).json({message: error.message})
      }
}


module.exports = {
    createQuestions,
    getQuestion,
    updateQuestion,
    getQuestions,
    deleteQuestions
}