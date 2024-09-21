import Resume from '../models/Resume.js';
import axios from 'axios';  // Import axios for making API requests
import dotenv from 'dotenv';

// Explicitly load the environment variables
dotenv.config();

// Load API key from environment variables (use dotenv for .env file management)
const apiKey = process.env.OPENAI_API_KEY;  // Ensure you have this in your .env file
console.log('Loaded API Key:', apiKey);

// Function to handle AI suggestion request for a specific job
export const suggestExperienceWithAI = async (req, res) => {
    try {
        console.log('req.params:', req.params);
        const { resumeId, jobIndex } = req.params;  // Get resume ID and job index from request params
        console.log('AI backend resume ID:', resumeId);
        
        // Fetch resume from the database using resumeID
        const resume = await Resume.findById(resumeId);
        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }

        // Check if jobIndex is valid
        if (!resume.employmentHistory[jobIndex]) {
            return res.status(400).json({ message: 'Invalid job index' });
        }

        // Get the specific job based on the jobIndex
        const job = resume.employmentHistory[jobIndex];
        let prompt = '';

        if (job.experiencePoints.length > 0) {
            // User has existing experience points
            prompt = `Make eight experience bullet points for the ${job.jobTitle} in ${job.jobField} for ${job.company}. 
            Here are the bullet points that user already has: \n${job.experiencePoints.join('\n')}
            
            VERY IMPORTANT: No need to give number, bullets or - for the points. just the points separated by enter button`;
        } else {
            // No experience points available
            prompt = `You need to suggest eight high quality experience bullet points for the ${job.jobTitle} in ${job.jobField} 
             for ${job.company} who has no experience until now.
            VERY IMPORTANT: No need to give number, bullets or - for the points. just the points separated by enter button`;
        }

        // Call OpenAI API to get the suggestions
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',  // Updated to use chat completions endpoint
            {
                model: 'gpt-3.5-turbo',  // You can use 'gpt-4' if available
                messages: [
                    { role: 'system', content: 'You are a helpful assistant who will generate experience list. ' },  // System message to guide the model
                    { role: 'user', content: prompt }  // Pass the user prompt dynamically
                ],
                max_tokens: 150,  // Adjust token limit based on your requirement
                temperature: 0.7,  // Controls the creativity of the response
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`  // Make sure the API key is properly set
                }
            }
        );

        // Safely check if the response is valid
        const aiResponse = response.data.choices?.[0]?.message?.content;

        if (!aiResponse) {
            return res.status(500).json({ message: 'No response from AI' });
        }

        console.log('AI Response:', aiResponse);

        // Assuming AI response gives 8 bullet points
        const suggestions = aiResponse.split('\n').slice(0, 8);

        // Store AI-generated suggestions in the aiexperiencePoints field for this specific job
        job.aiexperiencePoints = suggestions;

        // Save the updated resume in the database
        await resume.save();

        return res.status(200).json({ aiSuggestions: suggestions });

    } catch (error) {
        console.error('Error in AI processing:', error.message);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};
