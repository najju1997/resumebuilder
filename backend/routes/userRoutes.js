const express = require('express');
const { createUser, getUsers } = require('../controllers/userController');

const router = express.Router();

// Route for creating a new user
router.post('/users', createUser);

// Route for fetching all users
router.get('/users', getUsers);

module.exports = router;
