/** @format */

import QuestionModel, { CategoryModel } from '../models/QuestionModel.js';
import asyncHandle from 'express-async-handler';
import { replaceName } from '../utils/replaceName.js';

// create a question
const createQuestion = asyncHandle(async (req, res) => {
	const data = req.body;
	const { id } = data;

	if (id) {
		await QuestionModel.findByIdAndUpdate(id, data, { new: true });

		const newData = await QuestionModel.findById(id);
		return res
			.status(200)
			.json({ message: 'Question updated successfully', data: newData });
	}

	const newQuestion = new QuestionModel(data);
	await newQuestion.save();
	return res
		.status(201)
		.json({ message: 'Question created successfully', data: newQuestion });
});

// create many questions
const createManyQuestions = asyncHandle(async (req, res) => {
	const data = req.body; // Expecting an array of question objects
	const { questions } = data;

	if (!Array.isArray(questions) || questions.length === 0) {
		return res.status(400).json({ message: 'Invalid questions data' });
	}

	const createdQuestions = await QuestionModel.insertMany(questions);
	return res.status(201).json({
		message: 'Questions created successfully',
		data: createdQuestions,
	});
});

// get all questions by pagination, search, catetory
const getQuestions = asyncHandle(async (req, res) => {
	const { page, pageSize, search = '', category, createdBy } = req.query;

	const query = {};

	if (search) {
		query.slug = { $regex: search, $options: 'i' };
	}

	// categories is array
	if (category) {
		query.categories = { $in: category };
	}

	if (createdBy) {
		query.createdBy = createdBy;
	}

	// if no page or pageSize, return all
	if (!page || !pageSize) {
		const questions = await QuestionModel.find(query);
		return res
			.status(200)
			.json({ message: '', data: { questions, total: questions.length } });
	}
	// Pagination
	const skip = (parseInt(page) - 1) * parseInt(pageSize);

	const [questions, total] = await Promise.all([
		QuestionModel.find(query).skip(skip).limit(parseInt(pageSize)),
		QuestionModel.countDocuments(query),
	]);

	const promises = questions.map(async (question) => {
		const categories = question.categories || [];
		const populatedCategories = await Promise.all(
			categories.map(async (categoryId) => {
				// Assuming CategoryModel is imported and has a findById method
				const category = await CategoryModel.findById(categoryId);
				return category;
			})
		);
		return {
			...question.toObject(),
			categories: populatedCategories,
		};
	});

	const populatedQuestions = await Promise.all(promises);

	return res.status(200).json({
		message: 'get questions successfully',
		data: { questions: populatedQuestions, total },
	});
});

// delete questions by ids
const deleteQuestions = asyncHandle(async (req, res) => {
	const { ids } = req.body; // Expecting an array of question IDs

	if (!Array.isArray(ids) || ids.length === 0) {
		return res.status(400).json({ message: 'Invalid IDs data' });
	}

	await QuestionModel.deleteMany({ _id: { $in: ids } });
	return res
		.status(200)
		.json({ message: 'Questions deleted successfully', data: ids });
});
const categories = ['68dea190089bfdfc366927a1'];
const demoQuestions = [];

const addDemoQuestions = asyncHandle(async (req, res) => {
	const fixedQuestions = demoQuestions.map((q) => {
		return {
			...q,
			slug: replaceName(q.question),
			correctAnswer: q.answer,
			createdBy: '68b1c699d4346052479d3a80',
		};
	});

	try {
		await QuestionModel.insertMany(fixedQuestions);
		return res.status(200).json({
			message: 'Demo questions added successfully',
			data: fixedQuestions,
		});
	} catch (error) {
		console.log(error);
	}
});

export {
	createQuestion,
	createManyQuestions,
	getQuestions,
	deleteQuestions,
	addDemoQuestions,
};
