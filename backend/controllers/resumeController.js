import Resume from '../models/Resume.js'; // Adjust path to your Resume model

// Controller to create an empty resume
export const createEmptyResume = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming the user ID is stored in the authenticated request
    const newResume = new Resume({
      userId,
      personalDetails: {},
      contactInformation: {},
      professionalSummary: '',
      employmentHistory: [],
      skills: [],
      education: [],
      internships: [],
      courses: [],
      projects: [],
      references: [],
      websiteLinks: [],
    });

    await newResume.save();
    res.status(201).json({ message: 'Resume created', resumeId: newResume._id });
  } catch (error) {
    console.error('Error creating resume:', error);
    res.status(500).json({ message: 'Error creating resume' });
  }
};

// Controller to get all resumes for a specific user
export const getResumes = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming the user ID is stored in the authenticated request
    const resumes = await Resume.find({ userId });
    res.status(200).json(resumes);
  } catch (error) {
    console.error('Error fetching resumes:', error);
    res.status(500).json({ message: 'Error fetching resumes' });
  }
};

// Controller to get a resume by ID
export const getResumeById = async (req, res) => {
  try {
    const { resumeId } = req.params;

    const resume = await Resume.findById(resumeId);
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    res.status(200).json(resume); // Return the resume data
  } catch (error) {
    console.error('Error fetching resume:', error);
    res.status(500).json({ message: 'Error fetching resume' });
  }
};



// Controller to save a resume (create or update based on existence)
export const saveResume = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming the user ID is stored in the authenticated request
    const { resumeId } = req.params; // Get the resume ID from the URL parameter
    const resumeData = req.body; // Resume data sent from the frontend

    const existingResume = await Resume.findOne({ _id: resumeId, userId });

    if (existingResume) {
      // Update the existing resume
      const updatedResume = await Resume.findByIdAndUpdate(
        resumeId,
        { $set: resumeData },
        { new: true }
      );
      res.status(200).json({ message: 'Resume updated', resume: updatedResume });
    } else {
      // Create a new resume
      const newResume = new Resume({ userId, ...resumeData });
      await newResume.save();
      res.status(201).json({ message: 'Resume created', resume: newResume });
    }
  } catch (error) {
    console.error('Error saving resume:', error);
    res.status(500).json({ message: 'Error saving resume' });
  }
};

// Controller to delete a resume

export const deleteResume = async (req, res) => {
  try {
    const { id } = req.params;
    await Resume.findByIdAndDelete(id); // Delete the resume from the database
    res.status(200).json({ message: 'Resume deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting resume' });
  }
};

// Controller to rename a resume
export const renameResume = async (req, res) => {
  try {
    const { id } = req.params; // Use "id" instead of "resumeId" to match the route parameter

    console.log('resumeController.js Resume ID:', id); // Log to check the passed resume ID
    const { newName } = req.body; // Get the newName from the request body

    // Find the resume by ID and update only the resumeName field
    const updatedResume = await Resume.findByIdAndUpdate(
      id, // Use "id" to find the correct resume
      { resumeName: newName },
      { new: true } // Return the updated document
    );

    if (!updatedResume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    res.status(200).json({ message: 'Resume renamed', resume: updatedResume }); // Send the updated resume back
  } catch (error) {
    console.error('Error renaming resume:', error);
    res.status(500).json({ message: 'Error renaming resume' });
  }
};


// Controller to update a resume (can be partial updates for any section)
export const updateResume = async (req, res) => {
  try {
    console.log('Received resume ID:', req.params.id); // Log the resume ID
    const { id } = req.params;
    const resumeData = req.body;

    const updatedResume = await Resume.findByIdAndUpdate(id, { $set: resumeData }, { new: true });

    if (!updatedResume) {
      console.log('Resume not found for ID:', id);
      return res.status(404).json({ message: 'Resume not found' });
    }

    res.status(200).json({ message: 'Resume updated', resume: updatedResume });
  } catch (error) {
    console.error('Error updating resume:', error);
    res.status(500).json({ message: 'Error updating resume' });
  }
};

