const mongoose = require("mongoose")

const questionSchema = mongoose.Schema({
    question: String,

    classnumber: Number,

    answerOne: String,

    answerTwo: String,

    answerThree: String,

    answerFour: String,

    correctAnswer: String
},

{
    timestamps: true
})

const Question = mongoose.model('questions', questionSchema)
module.exports = Question