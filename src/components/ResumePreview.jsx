
import { useSelector } from 'react-redux';

const ResumePreview = () => {
  const {
    personalDetails,
    contactInformation,
    employmentHistory,
    skills,
    education,
    additionalSections,
  } = useSelector((state) => state.resume);

  return (
    <div className="resume-preview">
      <h2>{personalDetails.firstName} {personalDetails.lastName}</h2>
      {personalDetails.profilePhoto && (
        <img src={URL.createObjectURL(personalDetails.profilePhoto)} alt="Profile" />
      )}
      
      <h3>Contact Information</h3>
      <p>{contactInformation.email}</p>
      <p>{contactInformation.phone}</p>
      <p>{contactInformation.address}, {contactInformation.city}, {contactInformation.country} - {contactInformation.postalCode}</p>

      <h3>Employment History</h3>
      <ul>
        {employmentHistory.map((job, index) => (
          <li key={index}>
            <strong>{job.jobTitle}</strong> at {job.company} ({job.startDate} - {job.endDate})
            <p>{job.experiencePoints}</p>
          </li>
        ))}
      </ul>

      <h3>Skills</h3>
      <ul>
        {skills.map((skill, index) => (
          <li key={index}>{skill.skill} - {skill.level} out of 5</li>
        ))}
      </ul>

      <h3>Education</h3>
      <ul>
        {education.map((edu, index) => (
          <li key={index}>
            <strong>{edu.degree}</strong> from {edu.institute} ({edu.startDate} - {edu.endDate}) - {edu.location}
          </li>
        ))}
      </ul>

      <h3>Internships</h3>
      <ul>
        {additionalSections.internships.map((internship, index) => (
          <li key={index}>
            <strong>{internship.jobTitle}</strong> at {internship.company} ({internship.startDate} - {internship.endDate}) - {internship.location}
          </li>
        ))}
      </ul>

      <h3>Courses</h3>
      <ul>
        {additionalSections.courses.map((course, index) => (
          <li key={index}>
            <strong>{course.courseName}</strong> at {course.institution} ({course.startDate} - {course.endDate})
          </li>
        ))}
      </ul>

      <h3>References</h3>
      <ul>
        {additionalSections.references.map((reference, index) => (
          <li key={index}>
            {reference.referentName}, {reference.referentCompany} - {reference.referentEmail}, {reference.referentPhone}
          </li>
        ))}
      </ul>

      <h3>Projects</h3>
      <ul>
        {additionalSections.projects.map((project, index) => (
          <li key={index}>
            <strong>{project.projectName}</strong> ({project.startDate} - {project.endDate})
            <p>{project.projectDescription}</p>
          </li>
        ))}
      </ul>

      <h3>Website Links</h3>
      <ul>
        {additionalSections.websiteLinks.map((link, index) => (
          <li key={index}>
            <a href={link.url} target="_blank" rel="noopener noreferrer">{link.linkTitle}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResumePreview;
