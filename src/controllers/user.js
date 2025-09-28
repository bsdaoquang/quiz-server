/** @format */

import UserModel from '../models/UserModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { AppError } from '../../errors.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

const generateAccessToken = (user, exp) => {
	return jwt.sign(
		{ id: user._id, username: user.username, role: user.role },
		JWT_SECRET,
		{
			expiresIn: exp,
		}
	);
};

// Register
const register = asyncHandler(async (req, res) => {
	const { username, password, name } = req.body;
	const existingUser = await UserModel.findOne({ username });
	if (existingUser) {
		throw new AppError('Username already exists', 400);
	}

	const hashedPassword = await bcrypt.hash(password, 10);
	const user = new UserModel({ username, password: hashedPassword, name });
	await user.save();

	// Generate tokens
	const accessToken = generateAccessToken(user, '7d');
	const refreshToken = generateAccessToken(user, '14d');

	user.refreshToken = refreshToken;
	await user.save();

	delete user._doc.password;
	delete user._doc.refreshToken;

	res.status(201).json({
		message: 'Register user successfully!!',
		data: {
			...user._doc,
			accessToken,
		},
	});
});

// Login
const login = asyncHandler(async (req, res) => {
	const { username, password } = req.body;
	const user = await UserModel.findOne({ username });
	if (!user) {
		throw new AppError('Invalid credentials', 400);
	}
	// check isF2aEnabled
	if (user.isF2AEnabled) {
		// generate 6 digit code, hast and update to user, send code to email
		const code = Math.floor(100000 + Math.random() * 900000).toString();
		const hashedCode = await bcrypt.hash(code, 10);
		user.verificationCode = hashedCode;
		console.log('code', code);
		user.codeExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
		await user.save();

		// send code to email
		// await sendEmail(user.email, 'Your verification code', `Your code is ${code}`);
		res.status(202).json({
			message: 'Verification code sent to email',
			data: {
				isF2AEnabled: true,
				_id: user._id,
			},
		});
		return;
	}

	// compare verify cod

	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) {
		throw new AppError('Invalid credentials', 400);
	}

	const accessToken = generateAccessToken(user, '7d');
	const refreshToken = generateAccessToken(user, '14d');

	user.refreshToken = refreshToken;
	await user.save();

	delete user._doc.password;
	delete user._doc.refreshToken;

	res.status(200).json({
		message: 'login successfully!!',
		data: {
			...user._doc,
			accessToken,
		},
	});
});

const handleVerifyCode = asyncHandler(async (req, res) => {
	const { userId, code } = req.body;
	if (!userId || !code) {
		throw new AppError('Missing required fields', 400);
	}
	const user = await UserModel.findById(userId);
	if (!user) {
		throw new AppError('User not found', 404);
	}
	if (!user.verificationCode) {
		throw new AppError('No verification code found, please login again', 400);
	}
	const isCodeValid = await bcrypt.compare(code, user.verificationCode);
	if (!isCodeValid) {
		throw new AppError('Invalid verification code', 400);
	}
	// Clear verification code after successful verification
	user.verificationCode = undefined;
	user.codeExpires = undefined;

	const accessToken = generateAccessToken(user, '7d');
	const refreshToken = generateAccessToken(user, '14d');

	user.refreshToken = refreshToken;
	await user.save();

	delete user._doc.password;
	delete user._doc.refreshToken;

	res.status(200).json({
		message: '2FA verification successful!',
		data: {
			...user._doc,
			accessToken,
		},
	});
});

// Get all users
const getUsers = asyncHandler(async (req, res) => {
	const users = await UserModel.find().select('-password');
	res.status(200).json({
		message: 'Get all users successfully!!',
		data: users,
	});
});

// Get user by id
const getUser = asyncHandler(async (req, res) => {
	const user = await UserModel.findById(req.params.id).select('-password');
	if (!user) {
		throw new AppError('User not found', 404);
	}
	res.status(200).json({
		message: 'Get user successfully!!',
		data: user,
	});
});

// Update user
const updateUser = asyncHandler(async (req, res) => {
	const updateData = req.body;
	const { password } = updateData;
	if (password) {
		updateData.password = await bcrypt.hash(password, 10);
	}
	const user = await UserModel.findByIdAndUpdate(req.params.id, updateData, {
		new: true,
	}).select('-password');
	if (!user) {
		throw new AppError('User not found', 404);
	}
	res.status(200).json({
		message: 'Update user successfully!!',
		data: user,
	});
});

// Delete user
const deleteUser = asyncHandler(async (req, res) => {
	const user = await UserModel.findByIdAndDelete(req.params.id);
	if (!user) {
		throw new AppError('User not found', 404);
	}
	res.status(200).json({
		message: 'User deleted successfully!!',
		data: null,
	});
});

const getCurrentUser = asyncHandler(async (req, res) => {
	const user = await UserModel.findById(req.user.id).select('-password');
	if (!user) {
		throw new AppError('User not found', 404);
	}
	res.status(200).json({
		message: 'Get current user successfully!!',
		data: {
			...user._doc,
			accessToken: req.headers['authorization'].split(' ')[1],
		},
	});
});

export {
	register,
	login,
	getUsers,
	getUser,
	updateUser,
	deleteUser,
	getCurrentUser,
	handleVerifyCode,
};
