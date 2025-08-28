/** @format */

import UserModel, { HistoryModel } from '../models/UserModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

/* User CRUD */
// Create User
const createUser = async (req, res) => {
	try {
		const { password, ...rest } = req.body;

		const hashedPassword = await bcrypt.hash(password, 10);

		const user = new UserModel({ ...rest, password: hashedPassword });
		await user.save();

		const accessToken = jwt.sign(
			{ id: user._id, email: user.email },
			process.env.JWT_SECRET,
			{ expiresIn: '7d' }
		);

		const refreshToken = jwt.sign(
			{ id: user._id, email: user.email },
			process.env.JWT_SECRET,
			{ expiresIn: '14d' }
		);

		// Lưu refreshToken vào DB
		user.refreshToken = refreshToken;
		await user.save();

		delete user._doc.password; // Xóa password khỏi object user trả về

		res.status(201).json({
			status: 'success',
			data: {
				...user._doc,
				accessToken,
			},
		});
	} catch (err) {
		res.status(400).json({ status: 'error', message: err.message });
	}
};

// login with username and password
const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await UserModel.findOne({ email });
		if (!user) {
			return res
				.status(404)
				.json({ status: 'error', message: 'User not found' });
		}
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res
				.status(401)
				.json({ status: 'error', message: 'Invalid credentials' });
		}
		const accessToken = jwt.sign(
			{ id: user._id, email: user.email },
			process.env.JWT_SECRET,
			{ expiresIn: '7d' }
		);
		const refreshToken = jwt.sign(
			{ id: user._id, email: user.email },
			process.env.JWT_SECRET,
			{ expiresIn: '14d' }
		);
		user.refreshToken = refreshToken;

		await user.save();

		delete user._doc.password; // Xóa password khỏi object user trả về
		res
			.status(200)
			.json({ status: 'success', data: { ...user._doc, accessToken } });
	} catch (err) {
		res.status(400).json({ status: 'error', message: err.message });
	}
};

// Get all Users
const getUsers = async (req, res) => {
	try {
		const users = await UserModel.find();
		res.status(200).json({ status: 'success', data: users });
	} catch (err) {
		res.status(500).json({ status: 'error', message: err.message });
	}
};

// Get User by ID
const getUserById = async (req, res) => {
	try {
		const user = await UserModel.findById(req.params.id);
		if (!user) {
			return res
				.status(404)
				.json({ status: 'error', message: 'User not found' });
		}
		res.status(200).json({ status: 'success', data: user });
	} catch (err) {
		res.status(500).json({ status: 'error', message: err.message });
	}
};

// Update User
const updateUser = async (req, res) => {
	try {
		const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		if (!user) {
			return res
				.status(404)
				.json({ status: 'error', message: 'User not found' });
		}
		res.status(200).json({ status: 'success', data: user });
	} catch (err) {
		res.status(400).json({ status: 'error', message: err.message });
	}
};

// Delete User
const deleteUser = async (req, res) => {
	try {
		const user = await UserModel.findByIdAndDelete(req.params.id);
		if (!user) {
			return res
				.status(404)
				.json({ status: 'error', message: 'User not found' });
		}
		res.status(200).json({ status: 'success', message: 'User deleted' });
	} catch (err) {
		res.status(500).json({ status: 'error', message: err.message });
	}
};

/* History CRUD */
// Create History
const createHistory = async (req, res) => {
	try {
		const history = new HistoryModel(req.body);
		await history.save();
		res.status(201).json({ status: 'success', data: history });
	} catch (err) {
		res.status(400).json({ status: 'error', message: err.message });
	}
};

// Get all Histories
const getHistories = async (req, res) => {
	try {
		const histories = await HistoryModel.find();
		res.status(200).json({ status: 'success', data: histories });
	} catch (err) {
		res.status(500).json({ status: 'error', message: err.message });
	}
};

// Get History by ID
const getHistoryById = async (req, res) => {
	try {
		const history = await HistoryModel.findById(req.params.id);
		if (!history) {
			return res
				.status(404)
				.json({ status: 'error', message: 'History not found' });
		}
		res.status(200).json({ status: 'success', data: history });
	} catch (err) {
		res.status(500).json({ status: 'error', message: err.message });
	}
};

// Update History
const updateHistory = async (req, res) => {
	try {
		const history = await HistoryModel.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
		);
		if (!history) {
			return res
				.status(404)
				.json({ status: 'error', message: 'History not found' });
		}
		res.status(200).json({ status: 'success', data: history });
	} catch (err) {
		res.status(400).json({ status: 'error', message: err.message });
	}
};

// Delete History
const deleteHistory = async (req, res) => {
	try {
		const history = await HistoryModel.findByIdAndDelete(req.params.id);
		if (!history) {
			return res
				.status(404)
				.json({ status: 'error', message: 'History not found' });
		}
		res.status(200).json({ status: 'success', message: 'History deleted' });
	} catch (err) {
		res.status(500).json({ status: 'error', message: err.message });
	}
};

export {
	createUser,
	loginUser,
	getUsers,
	getUserById,
	updateUser,
	deleteUser,
	createHistory,
	getHistories,
	getHistoryById,
	updateHistory,
	deleteHistory,
};
