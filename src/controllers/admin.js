/** @format */

import asyncHandler from 'express-async-handler';
import PermissionModel from '../models/PemissionModel.js';
/*
  'tests',
	'questions',
	'results',
	'users',
	'permissions',
	'reports',
*/

const templatePermissions = [
	{
		name: 'admin',
		description: 'Full access to all modules',
		actions: [
			{ name: 'tests', create: true, read: true, update: true, delete: true },
			{
				name: 'questions',
				create: true,
				read: true,
				update: true,
				delete: true,
			},
			{ name: 'results', create: true, read: true, update: true, delete: true },
			{ name: 'users', create: true, read: true, update: true, delete: true },
			{
				name: 'permissions',
				create: true,
				read: true,
				update: true,
				delete: true,
			},
			{ name: 'reports', create: true, read: true, update: true, delete: true },
		],
	},
	{
		name: 'teacher',
		description: 'Access to tests, questions, and results modules',
		actions: [
			{ name: 'tests', create: true, read: true, update: true, delete: false },
			{
				name: 'questions',
				create: true,
				read: true,
				update: true,
				delete: false,
			},
			{
				name: 'results',
				create: false,
				read: true,
				update: false,
				delete: false,
			},
			{
				name: 'users',
				create: false,
				read: false,
				update: false,
				delete: false,
			},
			{
				name: 'permissions',
				create: false,
				read: false,
				update: false,
				delete: false,
			},
			{
				name: 'reports',
				create: false,
				read: false,
				update: false,
				delete: false,
			},
		],
	},
	{
		name: 'student',
		description: 'Access to take tests and view results',
		actions: [
			{
				name: 'tests',
				create: false,
				read: true,
				update: false,
				delete: false,
			},
			{
				name: 'questions',
				create: false,
				read: true,
				update: false,
				delete: false,
			},
			{
				name: 'results',
				create: false,
				read: true,
				update: false,
				delete: false,
			},
			{
				name: 'users',
				create: false,
				read: false,
				update: false,
				delete: false,
			},
			{
				name: 'permissions',
				create: false,
				read: false,
				update: false,
				delete: false,
			},
			{
				name: 'reports',
				create: false,
				read: false,
				update: false,
				delete: false,
			},
		],
	},
];

const createPermission = asyncHandler(async (req, res) => {
	const data = req.body;
	const id = data._id;
	if (id) {
		const permission = await PermissionModel.findByIdAndUpdate(id, data, {
			new: true,
		});

		return res.status(200).json({
			message: 'Permission updated successfully!!',
			data: permission,
		});
	}

	// const permission = await PermissionModel.create(data);
	// create default permissions if not exist
	const existingPermissions = await PermissionModel.find();
	if (existingPermissions.length === 0) {
		await PermissionModel.insertMany(templatePermissions);
	}
	res.status(201).json({
		message: 'Permission created successfully!!',
		data: 'Done',
	});
});

export { createPermission };
