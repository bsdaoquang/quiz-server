/** @format */

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.yao33hp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const connectMongoDB = async () => {
	try {
		await mongoose.connect(url);
		console.log('MongoDB connected successfully');
	} catch (error) {
		console.error('MongoDB connection error:', error);
		process.exit(1);
	}
};

export { connectMongoDB };
