const mongoose = require("mongoose")

const studentSchema = mongoose.Schema({

    email: String,

    questionId: String,

    answer: String,

    name: String,  // Add the name field
    
    finalScore: Number  // Add the final score field
    
},

{
    timestamps: true
})

const studentAnswer = mongoose.model('studentsAnswer', studentSchema)
module.exports = studentAnswer