/** @format */

import dotenv from 'dotenv';
import express from 'express';
import { dbConnect } from './src/dbConfig.js';
import { errorHandle } from './src/middlewares/errorHandle.js';
import questionRouter from './src/routers/question.js';
import userRouter from './src/routers/user.js';
import cors from 'cors';

dotenv.config();

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(express.json());
app.use('/users', userRouter);
app.use('/questions', questionRouter);

app.use(errorHandle);

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
