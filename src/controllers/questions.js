/** @format */

import QuestionModel from '../models/QuestionModel.js';

const addQuestion = async (req, res) => {
	try {
		const body = req.body;
		// check data in body

		// if ok

		// save data to database
		const newQuestion = await QuestionModel.create(body);
		res.status(201).json(newQuestion);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const deleteQuestion = async (req, res) => {
	try {
		// Logic to delete a question
		res.status(200).json({ message: 'Question deleted successfully' });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export { addQuestion, deleteQuestion };
