import Resume from '../models/Resume.js';

// Get all resumes for the authenticated user
export const getResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user.id });
    res.json(resumes);
  } catch (error) {
    console.error('Error fetching resumes:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Save or update a resume
export const saveResume = async (req, res) => {
  const { resumeData } = req.body;

  try {
    let resume = await Resume.findOne({ userId: req.user.id, _id: resumeData._id });

    if (resume) {
      // Update existing resume
      resume = Object.assign(resume, resumeData);
    } else {
      // Create new resume
      resume = new Resume({ ...resumeData, userId: req.user.id });
    }

    await resume.save();
    res.status(200).json(resume);
  } catch (error) {
    console.error('Error saving resume:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a specific resume
export const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findOneAndDelete({ userId: req.user.id, _id: req.params.id });
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    res.status(200).json({ message: 'Resume deleted successfully' });
  } catch (error) {
    console.error('Error deleting resume:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Rename a specific resume
export const renameResume = async (req, res) => {
  const { name } = req.body;
  
  try {
    const resume = await Resume.findOneAndUpdate(
      { userId: req.user.id, _id: req.params.id },
      { name },
      { new: true }
    );

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    res.status(200).json(resume);
  } catch (error) {
    console.error('Error renaming resume:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
