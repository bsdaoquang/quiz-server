/** @format */

import QuestionModel from '../models/QuestionModel.js';
import asyncHandle from 'express-async-handler';
import { AppError } from '../../errors.js';

const getAllQuestions = asyncHandle(async (req, res) => {
	const questions = await QuestionModel.find();
	res.status(200).json({ data: questions });
});

const getQuestionById = asyncHandle(async (req, res) => {
	const question = await QuestionModel.findById(req.params.id);
	if (!question) {
		throw new AppError('Question not found', 404);
	}
	res.status(200).json({ data: question });
});

const createQuestion = asyncHandle(async (req, res) => {
	const newQuestion = new QuestionModel(req.body);
	const savedQuestion = await newQuestion.save();
	res.status(201).json({ data: savedQuestion });
});

const updateQuestion = asyncHandle(async (req, res) => {
	const updatedQuestion = await QuestionModel.findByIdAndUpdate(
		req.params.id,
		req.body,
		{ new: true, runValidators: true }
	);
	if (!updatedQuestion) {
		throw new AppError('Question not found', 404);
	}
	res.status(200).json({ data: updatedQuestion });
});

const deleteQuestion = asyncHandle(async (req, res) => {
	const deletedQuestion = await QuestionModel.findByIdAndDelete(req.params.id);
	if (!deletedQuestion) {
		throw new AppError('Question not found', 404);
	}
	res.status(200).json({ message: 'Question deleted successfully' });
});

export {
	getAllQuestions,
	getQuestionById,
	createQuestion,
	updateQuestion,
	deleteQuestion,
};
