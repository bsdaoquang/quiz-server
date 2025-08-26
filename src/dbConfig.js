/** @format */
import { mongoose } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.yao33hp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

export const dbConnect = async () => {
	try {
		await mongoose.connect(url);
		console.log('Database connected successfully');
	} catch (error) {
		console.error('Database connection error:', error);
	}
};
