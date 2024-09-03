import express from 'express';
import { getResumes, saveResume, deleteResume, renameResume } from '../controllers/resumeController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Route to get all resumes for the authenticated user
router.get('/all', authMiddleware, getResumes);

// Route to save or update a resume
router.post('/save', authMiddleware, saveResume);

// Route to delete a specific resume
router.delete('/delete/:id', authMiddleware, deleteResume);

// Route to rename a specific resume
router.put('/rename/:id', authMiddleware, renameResume);

export default router;
