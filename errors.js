/** @format */

export class AppError extends Error {
	constructor(message, statusCode) {
		super(message);
		this.statusCode = statusCode || 500;
		this.isOperational = true;

		Error.captureStackTrace(this, this.constructor);
	}
}
