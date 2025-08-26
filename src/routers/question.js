/** @format */

import { Router } from 'express';
import { addQuestion } from '../controllers/questions.js';

const router = Router();

router.post('/add', addQuestion);

export default router;
