/** @format */

import UserModel from '../models/UserModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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
const register = async (req, res) => {
	try {
		const { username, password, name } = req.body;
		const existingUser = await UserModel.findOne({ username });
		if (existingUser)
			return res.status(400).json({ message: 'Username already exists' });

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
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

// Login
const login = async (req, res) => {
	try {
		const { username, password } = req.body;
		const user = await UserModel.findOne({ username });
		if (!user) return res.status(400).json({ message: 'Invalid credentials' });

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch)
			return res.status(400).json({ message: 'Invalid credentials' });

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
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

// CRUD operations
// Get all users
const getUsers = async (req, res) => {
	try {
		const users = await UserModel.find().select('-password');
		res.json(users);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

// Get user by id
const getUser = async (req, res) => {
	try {
		const user = await UserModel.findById(req.params.id).select('-password');
		if (!user) return res.status(404).json({ message: 'User not found' });
		res.json(user);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

// Update user
const updateUser = async (req, res) => {
	try {
		const { name, username, password } = req.body;
		const updateData = { name, username };
		if (password) {
			updateData.password = await bcrypt.hash(password, 10);
		}
		const user = await UserModel.findByIdAndUpdate(req.params.id, updateData, {
			new: true,
		}).select('-password');
		if (!user) return res.status(404).json({ message: 'User not found' });
		res.json(user);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

// Delete user
const deleteUser = async (req, res) => {
	try {
		const user = await UserModel.findByIdAndDelete(req.params.id);
		if (!user) return res.status(404).json({ message: 'User not found' });
		res.json({ message: 'User deleted' });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

export { register, login, getUsers, getUser, updateUser, deleteUser };
