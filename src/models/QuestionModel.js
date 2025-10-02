/** @format */
import mongoose from 'mongoose';

/* Question Schema
- question: String
- options: [String]
- correctAnswer: String
- categories: [String]
- note: String
- photoUrl: String 
 */

/* Example Question Document:
{
	question: "What is the capital of France?",
	options: ["Paris", "London", "Berlin", "Madrid"],
	correctAnswer: "Paris",
	categories: ["Geography", "Europe"],
	note: "Paris is the largest city in France.",
	photoUrl: "https://example.com/paris.jpg"
}
*/

const questionScheme = new mongoose.Schema(
	{
		question: { type: String, required: true },
		slug: { type: String, required: true }, // for search
		options: { type: [String], required: true },
		correctAnswer: { type: String, required: true },
		categories: { type: [String] },
		note: { type: String },
		photoUrl: { type: String },
		createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // reference to User model, created to remove
	},
	{
		timestamps: true,
	}
);

const categoryScheme = new mongoose.Schema(
	{
		name: { type: String, required: true },
		description: { type: String },
		slug: { type: String, required: true, unique: true }, // for search, if duplicate, add number at the end
	},
	{
		timestamps: true,
	}
);

const QuestionModel = mongoose.model('Question', questionScheme);
const CategoryModel = mongoose.model('Category', categoryScheme);
export default QuestionModel;

export { CategoryModel };
