/** @format */

import jwt from 'jsonwebtoken';

const verifyAccessToken = (req, res, next) => {
	const header = req.headers['authorization'];
	const token = header && header.split(' ')[1];

	if (!token) {
		return res.status(401).json({ message: 'Access token missing' });
	}

	jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
		if (err) {
			return res
				.status(403)
				.json({ message: 'Invalid or expired access token' });
		}

		req.user = decoded;
		next();
	});
};

export { verifyAccessToken };
