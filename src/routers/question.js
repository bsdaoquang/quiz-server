/** @format */

import { Router } from 'express';
import {
	createQuestion,
	getAllQuestions,
	getQuestionById,
	updateQuestion,
	deleteQuestion,
} from '../controllers/questions.js';

const router = Router();

router.post('/', createQuestion);
router.get('/', getAllQuestions);
router.get('/:id', getQuestionById);
router.put('/:id', updateQuestion);
router.delete('/:id', deleteQuestion);

export default router;
