import mongoose from "mongoose";

const questionSchema = mongoose.Schema(
	{
		question: String,

		classnumber: Number,

		answerOne: String,

		answerTwo: String,

		answerThree: String,

		answerFour: String,

		correctAnswer: String,
	},

	{
		timestamps: true,
	},
);

const Model = mongoose.model("questions", questionSchema);

export default Model;