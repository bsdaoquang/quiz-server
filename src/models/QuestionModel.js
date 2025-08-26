/** @format */
import mongoose from 'mongoose';

/**
 * question model:
 *    - content
 *    - options : string[]
 *    - answer : string,
 *    - category_id: string,
 *    - imageUrl?: string
 *    - reason: string
 *
 * example:
 * 1 + 1 = ?
 * 2
 * 3
 * 4
 * 5
 * 6
 *
 * 2
 *
 * @format
 */

const QuestionSchema = new mongoose.Schema(
	{
		content: { type: String, required: true },
		options: { type: [String], required: true },
		answer: { type: String, required: true },
		chap_id: { type: String, required: true },
		imageUrl: { type: String },
		reason: { type: String, default: '' },
	},
	{
		timestamps: true,
	}
);

const QuestionModel = mongoose.model('Question', QuestionSchema);

export default QuestionModel;
