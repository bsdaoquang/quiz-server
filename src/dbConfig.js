/** @format */
import { mongoose } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const dbUrl = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.uxgbfe2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

console.log(dbUrl);
export const dbConnect = async () => {
	try {
		await mongoose.connect(dbUrl);
		console.log('Database connected successfully');
	} catch (error) {
		console.error('Database connection error:', error);
	}
};
