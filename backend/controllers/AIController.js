import Resume from '../models/Resume.js';
import axios from 'axios';  // Import axios for making API requests
import dotenv from 'dotenv';

// Explicitly load the environment variables
dotenv.config();

// Load API key from environment variables (use dotenv for .env file management)
const apiKey = process.env.OPENAI_API_KEY;  // Ensure you have this in your .env file

// Function to handle AI suggestion request for a specific job
export const suggestExperienceWithAI = async (req, res) => {
    try {
        const { resumeId, jobIndex } = req.params;  // Get resume ID and job index from request params
        
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
            prompt = `Make eight experience points for the ${job.jobTitle} in ${job.jobField} for ${job.company}. 
            Here are the bullet points that user already has: \n${job.experiencePoints.join('\n')}
            make the results insightful and professional.
            
            VERY IMPORTANT: No need to give number, bullets or - for the points. just the points separated by enter button`;
        } else {
            // No experience points available
            prompt = `You need to suggest eight high quality experience bullet points for the ${job.jobTitle} in ${job.jobField} 
             for ${job.company} who has no experience until now.

             make the results insightful and professional.
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


// Function to generate AI-powered professional summary
export const generateProfessionalSummary = async (req, res) => {
    try {
        const { resumeId } = req.params;  // Get resume ID from request params

        console.log('AI backend summary resume ID:', resumeId);

        // Fetch the resume from the database (you may need to modify this based on your DB setup)
        const resume = await Resume.findById(resumeId);
        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }

        // Prepare prompt using relevant details for generating a professional summary
        const prompt = `Generate a professional summary based on the following details:
        Job Title: ${resume.employmentHistory[0].jobTitle || 'N/A'}
        Job Field: ${resume.employmentHistory[0].jobField || 'N/A'}
        Experience Bullet Points: 
        ${resume.employmentHistory[0].experiencePoints.join('\n') || 'No experience points provided.'}`;
        

        // Make a request to OpenAI to generate the summary
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',  // You can use 'gpt-4' if available
                messages: [
                    { role: 'system', content: 'You are a helpful assistant.' },
                    { role: 'user', content: prompt }
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

        // Get the generated summary from the response
        const aiSummary = response.data.choices[0].message.content;

        // Return the AI-generated professional summary
        res.status(200).json({ professionalSummary: aiSummary });

    } catch (error) {
        console.error('Error generating professional summary:', error.message);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};


export const suggestSkillsWithAI = async (req, res) => {
    try {
        const { resumeId } = req.params;  // Get resume ID from request params

        console.log('AI backend skills resume ID:', resumeId);

        // Fetch the resume from the database (you may need to modify this based on your DB setup)
        const resume = await Resume.findById(resumeId);
        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }

        const jobTitle= resume.employmentHistory[0].jobTitle || 'N/A';
        const jobField= resume.employmentHistory[0].jobField || 'N/A';
        const experiencePoints= resume.employmentHistory[0].jobField || 'N/A';
  
      // Create a prompt for OpenAI based on the user's jobTitle and jobField
      const prompt = `
        You are a resume builder expert.
        Suggest 8 one word professional skills for a person who is a ${jobTitle} in the ${jobField} field.
        Also, you can look into the experiences such as ${experiencePoints} to give better skills output.

        Give result in word separated by , in this format example eg: Leadership, Communication, Motivating
      `;
  
      // Call OpenAI's API
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo', // You can use 'gpt-4' if available
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: prompt }
        ],
          max_tokens: 100, // Limit the response length
          temperature: 0.7, // Adjust the creativity of the AI
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          },
        }
      );

      // Debugging: Log the entire response to inspect its structure
    console.log('OpenAI API response:', response.data.choices[0].message.content);

      // Extract the AI-generated skills from the response
      const aiSkills = response.data.choices[0].message.content.split(',').map(skill => skill.trim());

  
      // Return the skills back to the frontend
      return res.status(200).json({ suggestedSkills: aiSkills });
  
    } catch (error) {
      console.error('Error fetching skills from AI:', error);
      return res.status(500).json({ message: 'Error fetching skills from AI' });
    }
  };
