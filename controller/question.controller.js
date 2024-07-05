const Question = require("../models/questionModel.js");
const studentAnswer = require("../models/studentAnswers.js");

const createQuestions = async (req, res) => {
  try {
    if (
      !req.body.question ||
      !req.body.classnumber ||
      !req.body.answerOne ||
      !req.body.answerTwo ||
      !req.body.answerThree ||
      !req.body.answerFour ||
      !req.body.correctAnswer
    ) {
      return res
        .status(400)
        .send({ message: "Kindly input all required fields" });
    }
    const question = await Question.create(req.body);
    res.status(200).json(question);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const getQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    // excluding the correct answer

    const question = await Question.findById(id).select("-correctAnswer");
    res.status(200).json(question);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const question = await Question.findByIdAndUpdate(id, req.body);
    if (!question) {
      return res.status(404).json({ Message: "Question not found!" });
    }
    const updatedQuestion = await Question.findById(id);
    res.status(200).json(updatedQuestion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find({});
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteQuestions = async (req, res) => {
  try {
    const { id } = req.params;
    const question = await Question.findByIdAndDelete(id);
    if (!question) {
      return res.status(404).json({ message: "Question not found!" });
    }

    res.status(200).json({ message: "Question successfully deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const submitAnswer = async (req, res) => {
  try {
    const { name, email, questionId, answer } = req.body;

    if (!email || !questionId || !answer) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    // Check if an answer already exists for this email and questionId
    const existingAnswer = await studentAnswer.findOne({ email, questionId });

    if (existingAnswer) {
      // Update the existing answer
      existingAnswer.answer = answer;
      await existingAnswer.save();
      return res.status(200).json({ message: "Answer updated successfully" });
    } else {
      // Create a new answer entry
      const newAnswer = new studentAnswer({
        name,
        email,
        questionId,
        answer,
      });

      await newAnswer.save();
      return res.status(201).json({ message: "Answer submitted successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getFinalResult = async (req, res) => {
  try {
    const { email } = req.params;

    const studentAnswers = await studentAnswer.find({ email });

    if (!studentAnswers.length) {
      return res
        .status(404)
        .json({ message: "No answers found for this student" });
    }

    let correctCount = 0;

    for (const studentAnswer of studentAnswers) {
      const question = await Question.findById(studentAnswer.questionId);

      if (question && question.correctAnswer === studentAnswer.answer) {
        correctCount++;
      }
    }

    const totalQuestions = studentAnswers.length;
    const rawScore = (correctCount / totalQuestions) * 100;
    const finalScore = Math.round(rawScore);

    // Update or create the student's final score
    const student = await studentAnswer.findOneAndUpdate(
      { email },
      { finalScore },
      { new: true, upsert: true }
    );

    res.status(200).json({
      email,
      totalQuestions,
      correctCount,
      finalScore,
      message: `Student scored ${finalScore}%`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getscore = async (req, res) => {
  try {
    const students = await studentAnswer.find({ finalScore: { $exists: true } }, 'name email finalScore');
      return res.status(200).json(students);
  } catch (error) {
      return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createQuestions,
  getQuestion,
  updateQuestion,
  getQuestions,
  deleteQuestions,
  submitAnswer,
  getFinalResult,
  getscore
};
