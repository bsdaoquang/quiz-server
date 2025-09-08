/** @format */

export const errorHandle = (err, req, res, next) => {
	const status = err.status || 500;
	const message = err.message || 'Internal Server Error';

	res.status(status).json({
		success: false,
		error: {
			message,
			...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
		},
	});
};
