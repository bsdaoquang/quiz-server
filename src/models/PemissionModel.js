/** @format */

// permission model
/*
  Permission model
  - name: String required
  - description: String
  - actions: [module dependencies]
  - createdAt: Date
  - updatedAt: Date
*/

/*
  Module dependencies
  {
  name: String,
  create: Boolean,
  read: Boolean,
  update: Boolean,
  delete: Boolean
  }
*/

// modules: tests, questions, results, users, permissions, reports

import mongoose from 'mongoose';

const ModuleSchema = new mongoose.Schema({
	name: { type: String, required: true },
	create: { type: Boolean, default: false },
	read: { type: Boolean, default: false },
	update: { type: Boolean, default: false },
	delete: { type: Boolean, default: false },
});

const PermissionSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		description: { type: String },
		actions: [ModuleSchema],
	},
	{ timestamps: true }
);

export const MODULES = [
	'tests',
	'questions',
	'results',
	'users',
	'permissions',
	'reports',
];

const PermissionModel = mongoose.model('Permission', PermissionSchema);

export default PermissionModel;
