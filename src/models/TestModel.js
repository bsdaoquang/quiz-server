/** @format */

// Tests manager
/*
  Test informations:
  - _id
  - title
  - description
  - questions: [questionId]
  - createdBy: userId
  - createdAt
  - updatedAt

  // Có 2 cách để lưu trữ câu hỏi trong bài test:
  1. Lưu mảng questionId trong bài test (như trên)
  2. Lưu json câu hỏi trực tiếp trong bài test
  Cách 1 sẽ giúp tiết kiệm dung lượng hơn, nhưng sẽ phức tạp hơn khi cần lấy dữ liệu câu hỏi.
  Cách 2 sẽ đơn giản hơn khi lấy dữ liệu câu hỏi, nhưng sẽ tốn dung lượng hơn.
*/

import mongoose from 'mongoose';
const { Schema } = mongoose;

const testSchema = new Schema(
	{
		title: { type: String, required: true },
		description: { type: String },
		slug: { type: String },
		categoryId: { type: Schema.Types.ObjectId, ref: 'Category' },
		questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
		createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	},
	{ timestamps: true }
);

const TestModel = mongoose.model('Test', testSchema);
export default TestModel;
