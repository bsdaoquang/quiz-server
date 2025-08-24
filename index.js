/** @format */

import express from 'express';

const app = express();

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.listen(3000, (error) => {
	if (error) {
		console.error('Error starting server:', error);
	} else {
		console.log('Server is running on port http://localhost:3000');
	}
});
