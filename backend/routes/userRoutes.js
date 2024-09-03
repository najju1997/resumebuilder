import express from 'express';
import { getUserProfile, updateUserProfile, getUsers, createUser } from '../controllers/userController.js';
import auth from '../middleware/authMiddleware.js';

const router = express.Router();

// Route to get the logged-in user's profile
router.get('/profile', auth, getUserProfile);

// Route to update the logged-in user's profile
router.put('/profile', auth, updateUserProfile);

// Route to create a new user (useful for testing or additional routes)
router.post('/', createUser);

// Route to get all users (useful for testing or admin routes)
router.get('/', auth, getUsers);

export default router;
