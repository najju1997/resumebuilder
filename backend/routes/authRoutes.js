import express from 'express';
import { signup, login, googleLogin } from '../controllers/authController.js';

const router = express.Router();

// Email/Password based signup and login routes
router.post('/signup', signup);
router.post('/login', login);

// Google OAuth login route
router.post('/google-login', googleLogin);

export default router;
