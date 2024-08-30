// routes/resumeRoutes.js
const express = require('express');
const Resume = require('../models/Resume');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

// Save or update resume
router.post('/save', auth, async (req, res) => {
  try {
    const resumeData = req.body;
    let resume = await Resume.findOne({ userId: req.user.id });

    if (resume) {
      resume = await Resume.findByIdAndUpdate(resume._id, resumeData, { new: true });
    } else {
      resume = new Resume({ ...resumeData, userId: req.user.id });
      await resume.save();
    }

    res.json(resume);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get resume
router.get('/get', auth, async (req, res) => {
  try {
    const resume = await Resume.findOne({ userId: req.user.id });
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    res.json(resume);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
