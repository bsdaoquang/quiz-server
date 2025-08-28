/** @format */

/*
  Role:
    user: là người dùng vào làm bài thi, có thể xem lại kết quả bài thi của mình, lưu lịch sử làm bài thi... 
    customer: là người tạo và quản lý các câu hỏi, có thể xem thống kê kết quả làm bài thi của tất cả users
    admin: là người quản lý toàn bộ hệ thống, có thể thêm, sửa, xóa người dùng và câu hỏi
*/

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			minlength: 3,
		},
		email: {
			type: String,
			trim: true,
			lowercase: true,
		},
		password: {
			type: String,
			required: true,
			minlength: 6,
		},
		// user: làm bài thi, xem lại kết quả, lưu lịch sử
		// customer: tạo/quản lý câu hỏi, xem thống kê kết quả users
		// admin: quản lý hệ thống, thêm/sửa/xóa user & câu hỏi
		role: {
			type: String,
			enum: ['user', 'customer', 'admin'],
			default: 'user',
		},
	},
	{
		timestamps: true,
	}
);

const historySchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		quizId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Quiz',
			required: true,
		},
		score: {
			type: Number,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const UserModel = mongoose.model('User', userSchema);
const HistoryModel = mongoose.model('History', historySchema);

export default UserModel;

export { HistoryModel };
