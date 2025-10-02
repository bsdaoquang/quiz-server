/** @format */

// create and update category if id is provided

import asyncHandle from 'express-async-handler';
import { CategoryModel } from '../models/QuestionModel.js';

const handleCategory = asyncHandle(async (req, res) => {
	const data = req.body;
	const { id } = data;

	if (id) {
		await CategoryModel.findByIdAndUpdate(id, data, { new: true });

		const newData = await CategoryModel.findById(id);
		return res
			.status(200)
			.json({ message: 'Category updated successfully', data: newData });
	}

	const { slug } = data;
	const existingCategory = await CategoryModel.find({ slug });

	const newSlug =
		existingCategory.length > 0
			? `${slug}-${existingCategory.length + 1}`
			: slug;

	const newCategory = new CategoryModel({ ...data, slug: newSlug });
	await newCategory.save();
	return res
		.status(201)
		.json({ message: 'Category created successfully', data: newCategory });
});

// get all categories

const getCategories = asyncHandle(async (_req, res) => {
	const categories = await CategoryModel.find({});
	return res
		.status(200)
		.json({ message: 'Categories fetched successfully', data: categories });
});

export { handleCategory, getCategories };
