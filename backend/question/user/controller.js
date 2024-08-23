import StudentModel from "../../student/model.js";
import Model from "../model.js";



const Controller = {

  createQuestions: async (req, res) => {
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
      const question = await Model.create(req.body);
      res.status(200).json(question);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  },

  getQuestion: async (req, res) => {
    try {
      const { id } = req.params;
      // excluding the correct answer

      const question = await Model.findById(id).select("-correctAnswer");
      res.status(200).json(question);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateQuestion: async (req, res) => {
    try {
      const { id } = req.params;
      const question = await Model.findByIdAndUpdate(id, req.body);
      if (!question) {
        return res.status(404).json({ Message: "Question not found!" });
      }
      const updatedQuestion = await Model.findById(id);
      res.status(200).json(updatedQuestion);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getQuestions: async (req, res) => {
    try {
      const questions = await Model.find({});
      res.status(200).json(questions);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteQuestions: async (req, res) => {
    try {
      const { id } = req.params;
      const question = await Model.findByIdAndDelete(id);
      if (!question) {
        return res.status(404).json({ message: "Question not found!" });
      }

      res.status(200).json({ message: "Question successfully deleted" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },


  submitAnswer: async (req, res) => {


    try {
      const { name, email, questionId, answer } = req.body;

      if (!email || !questionId || !answer) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const question = await Model.findById(questionId);
      if (!question) {
        return res.status(404).json({ message: "Question not found" });
      }

      // Check if an answer already exists for this email and questionId
      const existingAnswer = await StudentModel.findOne({ email, questionId });

      if (!existingAnswer) {
        const newAnswer = new StudentModel({
          name,
          email,
          questionId,
          answer,
        });

        await newAnswer.save();
        return res.status(201).json({ message: "Answer submitted successfully" });
      }

      // Update the existing answer
      existingAnswer.answer = answer;
      await existingAnswer.save();
      return res.status(200).json({ message: "Answer updated successfully" });
    }
    catch (error) {
      res.status(500).json({ message: error.message });
    }

  },

  getFinalResult: async (req, res) => { 
    try {
      const { email } = req.params;

      const studentAnswers = await StudentModel.find({ email });
      if (!studentAnswers.length) {
        return res
          .status(404)
          .json({ message: "No answers found for this student" });
      }

      let correctCount = 0;

      for (const studentAnswer of studentAnswers) {
        const question = await Model.findById(studentAnswer.questionId);

        if (question && question.correctAnswer === studentAnswer.answer) {
          correctCount++;
        }
      }

      const totalQuestions = studentAnswers.length;
      const rawScore = (correctCount / totalQuestions) * 100;
      const finalScore = Math.round(rawScore);


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
  },

  getScore: async (req, res) => {
    try {
      const students = await StudentModel.find({ finalScore: { $exists: true } }, 'name email finalScore');
      return res.status(200).json(students);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

};



export default Controller;