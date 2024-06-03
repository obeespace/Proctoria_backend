const mongoose = require("mongoose")

const questionSchema = mongoose.Schema({
    question: {
        type: String,
        require: true
    },

    class: {
        type: Number,
        require: true
    },

    answerOne: {
        type: String,
        require: true
    },

    answerTwo: {
        type: String,
        require: true
    },

    answerThree: {
        type: String,
        require: true
    },

    answerFour: {
        type: String,
        require: true
    },

    correctAnswer: {
        type: String,
        require: true
    }
},

{
    timestamps: true
})

const Question = mongoose.model('questions', questionSchema)
module.exports = Question