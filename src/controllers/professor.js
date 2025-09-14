/** @format */

import dotenv from 'dotenv';
import asyncHandle from 'express-async-handler';
import { AppError } from '../../errors.js';
import ProfessorModel from '../models/ProfessorModel.js';
import UserModel from '../models/UserModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

dotenv.config();

// controller giảng viên
const createProfessor = asyncHandle(async (req, res) => {
	const data = req.body;
	const { username, password } = data;

	const email = data.email;

	if (!username || !password) {
		throw new AppError('Missing required fields', 400);
	}
	const existing = await ProfessorModel.findOne({
		$or: [{ email }, { username }],
	});
	if (existing) {
		throw new AppError('Professor already exists', 409);
	}
	const hashedPassword = await bcrypt.hash(password, 10);
	// Create new user with role 'teacher'
	const user = await UserModel.create({
		username,
		password: hashedPassword,
		email,
		role: 'teacher',
	});
	// Create professor profile linked to user
	const professor = await ProfessorModel.create({
		...data,
		uid: user._id,
	});

	res.status(201).json({
		message: 'Professor created successfully',
		data: {
			professor,
		},
	});
});

// login professor with username and password
const loginProfessor = asyncHandle(async (req, res) => {
	const { username, password } = req.body;

	if (!username || !password) {
		throw new AppError('Missing required fields', 400);
	}

	const professor = await UserModel.findOne({ username });
	if (!professor) {
		throw new AppError('Invalid credentials', 401);
	}

	const isMatch = await bcrypt.compare(password, professor.password);
	if (!isMatch) {
		throw new AppError('Invalid credentials', 401);
	}

	// Successful login
	// create access token and refresh token

	const accessToken = jwt.sign({ id: professor._id }, process.env.JWT_SECRET);

	res.json({
		message: 'Login successful',
		data: {
			...professor._doc,
			accessToken,
		},
	});
});

const getProfessors = asyncHandle(async (req, res) => {
	const professors = await ProfessorModel.find();
	res.json(professors);
});

const getProfessorById = asyncHandle(async (req, res) => {
	const professor = await ProfessorModel.findById(req.params.id);
	if (!professor) {
		throw new AppError('Professor not found', 404);
	}
	res.json(professor);
});

const updateProfessor = asyncHandle(async (req, res) => {
	const data = req.body;
	const { name, email, department } = data;
	const professor = await ProfessorModel.findById(req.params.id);
	if (!professor) {
		throw new AppError('Professor not found', 404);
	}
	if (email && email !== professor.email) {
		const existing = await ProfessorModel.findOne({ email });
		if (existing) {
			throw new AppError('Email already in use', 409);
		}
	}
	const updatedProfessor = await ProfessorModel.findByIdAndUpdate(
		req.params.id,
		data,
		{ new: true }
	);

	res.status(200).json({
		message: 'Professor updated successfully',
		professor: updatedProfessor,
	});
});

const deleteProfessor = asyncHandle(async (req, res) => {
	const professor = await ProfessorModel.findById(req.params.id);
	if (!professor) {
		throw new AppError('Professor not found', 404);
	}
	await professor.deleteOne();
	res.status(204).end();
});

export {
	createProfessor,
	deleteProfessor,
	getProfessorById,
	getProfessors,
	updateProfessor,
	loginProfessor,
};
