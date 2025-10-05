/** @format */

import TestModel from '../models/TestModel.js';
import asyncHandler from 'express-async-handler';

// CRUD tests
const createTest = asyncHandler(async (req, res) => {
	const { title, categoryId, userId, questions } = req.body;
	const test = await TestModel.create({ title, categoryId, userId, questions });
	res.status(201).json(test);
});

const getTests = asyncHandler(async (req, res) => {
	const { page = 1, limit = 10, categoryId, userId } = req.query;
	const filter = {};
	if (categoryId) filter.categoryId = categoryId;
	if (userId) filter.userId = userId;

	const tests = await TestModel.find(filter)
		.skip((page - 1) * limit)
		.limit(Number(limit));
	const total = await TestModel.countDocuments(filter);

	res.status(200).json({
		message: 'Get tests successfully',
		data: {
			tests,
			total,
		},
	});
});

const getTestById = asyncHandler(async (req, res) => {
	const test = await TestModel.findById(req.params.id);
	if (!test) {
		res.status(404);
		throw new Error('Test not found');
	}
	res.status(200).json({
		message: 'Get test successfully',
		data: test,
	});
});

const updateTest = asyncHandler(async (req, res) => {
	const test = await TestModel.findById(req.params.id);
	if (!test) {
		res.status(404);
		throw new Error('Test not found');
	}
	Object.assign(test, req.body);
	await test.save();
	res.status(200).json({
		message: 'Test updated successfully',
		data: test,
	});
});

const deleteTest = asyncHandler(async (req, res) => {
	const test = await TestModel.findById(req.params.id);
	if (!test) {
		res.status(404);
		throw new Error('Test not found');
	}
	await test.deleteOne();
	res.status(200).json({ message: 'Test deleted successfully' });
});

export { createTest, getTests, getTestById, updateTest, deleteTest };
