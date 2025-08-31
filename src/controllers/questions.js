/** @format */

import QuestionModel from '../models/QuestionModel.js';

const getAllQuestions = async (req, res) => {
	try {
		const questions = await QuestionModel.find();
		res.status(200).json({ status: 200, data: questions });
	} catch (err) {
		res.status(500).json({ status: 500, error: err.message });
	}
};

const getQuestionById = async (req, res) => {
	console.log(req);
	try {
		const question = await QuestionModel.findById(req.params.id);
		if (!question) {
			return res.status(404).json({ status: 404, error: 'Question not found' });
		}
		res.status(200).json({ status: 200, data: question });
	} catch (err) {
		res.status(500).json({ status: 500, error: err.message });
	}
};

const createQuestion = async (req, res) => {
	try {
		const newQuestion = new QuestionModel(req.body);
		const savedQuestion = await newQuestion.save();

		res.status(201).json({ status: 201, data: savedQuestion });
	} catch (err) {
		res.status(400).json({ status: 400, error: err.message });
	}
};

const updateQuestion = async (req, res) => {
	try {
		const updatedQuestion = await QuestionModel.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true, runValidators: true }
		);
		if (!updatedQuestion) {
			return res.status(404).json({ status: 404, error: 'Question not found' });
		}
		res.status(200).json({ status: 200, data: updatedQuestion });
	} catch (err) {
		res.status(400).json({ status: 400, error: err.message });
	}
};

const deleteQuestion = async (req, res) => {
	try {
		const deletedQuestion = await QuestionModel.findByIdAndDelete(
			req.params.id
		);
		if (!deletedQuestion) {
			return res.status(404).json({ status: 404, error: 'Question not found' });
		}
		res
			.status(200)
			.json({ status: 200, message: 'Question deleted successfully' });
	} catch (err) {
		res.status(500).json({ status: 500, error: err.message });
	}
};

export {
	getAllQuestions,
	getQuestionById,
	createQuestion,
	updateQuestion,
	deleteQuestion,
};
