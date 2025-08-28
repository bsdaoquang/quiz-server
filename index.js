/** @format */

import express from 'express';
import dotenv from 'dotenv';
import { dbConnect } from './src/dbConfig.js';
import questionRouter from './src/routers/question.js';
import userRouter from './src/routers/userRouter.js';

dotenv.config();

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use('/questions', questionRouter);
app.use('/users', userRouter);

dbConnect()
	.then(() => {
		app.listen(PORT, (error) => {
			if (error) {
				console.error('Error starting server:', error);
			} else {
				console.log(`Server is running on port http://localhost:${PORT}`);
			}
		});
	})
	.catch((error) => {
		console.error('Error connecting to the database:', error);
	});
