/** @format */

import mongoose from 'mongoose';

/**
 * User model for MongoDB
 *   _id: ObjectId
 *   email: String not required
 *   username: String required
 *   password: String required
 *   name: String required
 *   age: Number required
 *   refreshToken: String
 *   role: admin | teacher | student default: teacher
 *     admin: has full access
 *     teacher: can create and manage quizzes, questions
 *     student: can take quizzes
 *
 * @format
 */

const UserSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			trim: true,
			lowercase: true,
		},
		username: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		password: {
			type: String,
			required: true,
		},
		isF2AEnabled: {
			type: Boolean,
			default: false,
		},
		verificationCode: {
			type: String, // hash of 6 number login code
			default: null,
		},
		name: {
			type: String,
			trim: true,
		},
		age: {
			type: Number,
			min: 0,
		},
		refreshToken: {
			type: String,
		},
		role: {
			type: String,
			enum: ['admin', 'teacher', 'student'],
			default: 'teacher',
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
