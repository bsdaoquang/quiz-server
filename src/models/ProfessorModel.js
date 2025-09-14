/** @format */

import mongoose from 'mongoose';
/*
  export interface ProfessorModel {
	name: string;
	email: string;
	phone?: string;
	department: string;
	title?: string; // e.g., Associate Professor, Lecturer
	avatarUrl?: string;
	createdAt: Date;
	updatedAt: Date;
	isActive: boolean;
	username: string;
	ageOfExperience?: number; // in years
	bio?: string; // short biography
	coursesTaught?: string[]; // list of course IDs or names
	studentCount?: number; // number of students managed
	rated?: number; // average rating from students
	reviewsCount?: number; // number of reviews received
	_id?: string; // MongoDB specific field
}
*/

const ProfessorSchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	phone: { type: String },
	department: { type: String, required: true },
	title: { type: String },
	avatarUrl: { type: String },
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
	isActive: { type: Boolean, default: true },
	username: { type: String, required: true, unique: true },
	ageOfExperience: { type: Number },
	bio: { type: String },
	uid: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	coursesTaught: [{ type: String, ref: 'Course', default: [] }],
	studentCount: { type: Number, default: 0 },
	rated: { type: Number, default: 0 },
	reviewsCount: { type: Number, default: 0 },
});

const ProfessorModel = mongoose.model('Professor', ProfessorSchema);
export default ProfessorModel;
