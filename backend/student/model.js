// models/studentAnswerModel.js

import { Schema, model } from "mongoose";

const studentSchema = new Schema({
    email: String,
    questionId: String,
    answer: String,
    name: String,  // Add the name field
    finalScore: Number  // Add the final score field
}, {
    timestamps: true
});

const studentAnswer = model('studentanswer', studentSchema);
export default studentAnswer; 
