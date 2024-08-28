import React from 'react';
import { useSelector } from 'react-redux';

const Template1 = () => {
  const personalDetails = useSelector((state) => state.resume.personalDetails);
  const professionalSummary = useSelector((state) => state.resume.professionalSummary);
  const contactInformation = useSelector((state) => state.resume.contactInformation);
  const employmentHistory = useSelector((state) => state.resume.employmentHistory);
  const skills = useSelector((state) => state.resume.skills);
  const education = useSelector((state) => state.resume.education);
  const internships = useSelector((state) => state.resume.additionalSections.internships);
  const courses = useSelector((state) => state.resume.additionalSections.courses);
  const projects = useSelector((state) => state.resume.additionalSections.projects);
  const references = useSelector((state) => state.resume.additionalSections.references);
  const websiteLinks = useSelector((state) => state.resume.additionalSections.websiteLinks);

  return (
    <div className="bg-white p-8" style={{ width: '210mm', height: '297mm' }}>
      {/* Personal Details */}
      <div className="text-center">
        <h1 className="text-4xl font-bold">{`${personalDetails.firstName} ${personalDetails.lastName}`}</h1>
        <p className="text-sm">{contactInformation.address}</p>
        <p className="text-sm">{`${contactInformation.city}, ${contactInformation.country} - ${contactInformation.postalCode}`}</p>
        <p className="text-sm">{contactInformation.email}</p>
        <p className="text-sm">{contactInformation.phone}</p>
      </div>
      <hr className="my-4 border-gray-300" />

            {/* Professional Summary */}
            {professionalSummary && (
        <div className="mb-4">
          
          <p className="text-sm">{professionalSummary}</p>
        </div>
      )}

      {/* Employment History */}
      {employmentHistory.length > 0 && (
        <div className="mb-4">
          <h2 className="text-2xl font-semibold">Employment History</h2>
          {employmentHistory.map((job, index) => (
            <div key={index} className="mt-4">
              <h3 className="text-lg font-semibold">{job.jobTitle}</h3>
              <p className="text-sm italic">{job.company} | {job.location}</p>
              <p className="text-sm">{job.startDate} - {job.endDate}</p>
              {job.experiencePoints && (
                <ul className="list-disc list-inside">
                  {job.experiencePoints.split('\n').map((point, idx) => (
                    <li key={idx} className="text-sm">{point}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-4">
          <h2 className="text-2xl font-semibold">Skills</h2>
          <ul className="list-disc list-inside">
            {skills.map((skill, index) => (
              <li key={index} className="text-sm">{skill.skill} ({skill.level} out of 5)</li>
            ))}
          </ul>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-4">
          <h2 className="text-2xl font-semibold">Education</h2>
          {education.map((edu, index) => (
            <div key={index} className="mt-4">
              <h3 className="text-lg font-semibold">{edu.degree}</h3>
              <p className="text-sm italic">{edu.institute} | {edu.location}</p>
              <p className="text-sm">{edu.startDate} - {edu.endDate}</p>
            </div>
          ))}
        </div>
      )}

      {/* Internships */}
      {internships.length > 0 && (
        <div className="mb-4">
          <h2 className="text-2xl font-semibold">Internships</h2>
          {internships.map((internship, index) => (
            <div key={index} className="mt-4">
              <h3 className="text-lg font-semibold">{internship.jobTitle}</h3>
              <p className="text-sm italic">{internship.company} | {internship.location}</p>
              <p className="text-sm">{internship.startDate} - {internship.endDate}</p>
            </div>
          ))}
        </div>
      )}

      {/* Courses */}
      {courses.length > 0 && (
        <div className="mb-4">
          <h2 className="text-2xl font-semibold">Courses</h2>
          {courses.map((course, index) => (
            <div key={index} className="mt-4">
              <h3 className="text-lg font-semibold">{course.courseName}</h3>
              <p className="text-sm italic">{course.institution}</p>
              <p className="text-sm">{course.startDate} - {course.endDate}</p>
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="mb-4">
          <h2 className="text-2xl font-semibold">Projects</h2>
          {projects.map((project, index) => (
            <div key={index} className="mt-4">
              <h3 className="text-lg font-semibold">{project.projectName}</h3>
              <p className="text-sm">{project.projectDescription}</p>
              <p className="text-sm">{project.startDate} - {project.endDate}</p>
            </div>
          ))}
        </div>
      )}

      {/* References */}
      {references.length > 0 && (
        <div className="mb-4">
          <h2 className="text-2xl font-semibold">References</h2>
          {references.map((reference, index) => (
            <div key={index} className="mt-4">
              <h3 className="text-lg font-semibold">{reference.referentName}</h3>
              <p className="text-sm">{reference.referentCompany}</p>
              <p className="text-sm">{reference.referentEmail}</p>
              <p className="text-sm">{reference.referentPhone}</p>
            </div>
          ))}
        </div>
      )}

      {/* Website Links */}
      {websiteLinks.length > 0 && (
        <div className="mb-4">
          <h2 className="text-2xl font-semibold">Website Links</h2>
          <ul>
            {websiteLinks.map((link, index) => (
              <li key={index} className="text-sm">
                <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  {link.linkTitle}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Template1;
