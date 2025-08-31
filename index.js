/** @format */

import express from 'express';
import dotenv from 'dotenv';
import { dbConnect } from './src/dbConfig.js';
import questionRouter from './src/routers/question.js';
import userRouter from './src/routers/user.js';
import { verifyAccessToken } from './src/middlewares/authorization.js';

dotenv.config();

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use('/users', userRouter);
app.use('/questions', questionRouter);

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
