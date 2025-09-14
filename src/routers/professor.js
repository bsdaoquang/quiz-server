/** @format */

import { Router } from 'express';
import {
	createProfessor,
	getProfessors,
	getProfessorById,
	updateProfessor,
	deleteProfessor,
	loginProfessor,
} from '../controllers/professor.js';

const router = Router();

router.post('/', createProfessor);
router.post('/login', loginProfessor);
// router.get('/', getProfessors);
// router.get('/:id', getProfessorById);
// router.put('/:id', updateProfessor);
// router.delete('/:id', deleteProfessor);

export default router;
