/** @format */

import express from 'express';
import dotenv from 'dotenv';
import { dbConnect } from './src/dbConfig.js';

dotenv.config();

const app = express();

app.get('/', (req, res) => {
	res.send('Hello World!');
});

dbConnect()
	.then(() => {
		app.listen(3000, (error) => {
			if (error) {
				console.error('Error starting server:', error);
			} else {
				console.log('Server is running on port http://localhost:3000');
			}
		});
	})
	.catch((error) => {
		console.error('Error connecting to the database:', error);
	});
