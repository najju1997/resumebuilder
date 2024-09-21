import express from 'express';
import {
    createEmptyResume,
  getResumes,
  saveResume,
  deleteResume,
  renameResume,
  updateResume,
  getResumeById,
} from '../controllers/resumeController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { suggestExperienceWithAI } from '../controllers/AIController.js';

const router = express.Router();

router.post('/create-empty', authMiddleware, createEmptyResume);

// Route to get all resumes for the authenticated user
router.get('/all', authMiddleware, getResumes);

// Route to get resumes data by ID for the authenticated user
router.get('/getresumebyid/:resumeId', authMiddleware, getResumeById);

// Route to save or create a resume and return the resume ID
router.post('/save', authMiddleware, saveResume);

// Route to delete a specific resume
router.delete('/delete/:id', authMiddleware, deleteResume);

// Route to rename a specific resume
router.put('/rename/:id', authMiddleware, renameResume);

// Route to update a specific resume
router.put('/update/:id', authMiddleware, updateResume);

// Route to handle AI suggestion for a specific job in a resume
router.post('/ai/suggest/:resumeId/:jobIndex', suggestExperienceWithAI);

export default router;


