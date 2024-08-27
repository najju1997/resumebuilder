import React from 'react';

const Template1 = ({ resumeData }) => {
  return (
    <div className="p-8 bg-white shadow-lg max-w-[210mm] mx-auto">
      <div className="pb-6 border-b-2 border-gray-300">
        <h1 className="text-4xl font-bold text-gray-900">
          {resumeData.personalDetails.firstName} {resumeData.personalDetails.lastName}
        </h1>
        <div className="flex justify-between mt-2 text-sm text-gray-600">
          <div>
            <p>{resumeData.contactInformation.address}</p>
            <p>{resumeData.contactInformation.city}, {resumeData.contactInformation.country} - {resumeData.contactInformation.postalCode}</p>
          </div>
          <div className="text-right">
            <p>{resumeData.contactInformation.phone}</p>
            <p>{resumeData.contactInformation.email}</p>
          </div>
        </div>
      </div>

      <section className="py-6 border-b-2 border-gray-300">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Professional Summary</h2>
        <p className="text-gray-700 leading-relaxed">{resumeData.professionalSummary}</p>
      </section>

      <section className="py-6 border-b-2 border-gray-300">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Employment History</h2>
        {resumeData.employmentHistory.map((job, index) => (
          <div key={index} className="mb-6">
            <div className="flex justify-between">
              <h3 className="text-xl font-semibold text-gray-900">{job.jobTitle} | {job.company}</h3>
              <p className="text-gray-600">{job.startDate} - {job.endDate || 'Present'}</p>
            </div>
            <p className="text-gray-600 italic mb-2">{job.location}</p>
            <ul className="list-disc pl-5 text-gray-700 leading-relaxed">
              {job.experiencePoints.split('\n').map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="py-6 border-b-2 border-gray-300">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Skills</h2>
        <div className="flex flex-wrap">
          {resumeData.skills.map((skill, index) => (
            <span key={index} className="mr-4 mb-2 px-3 py-1 border border-gray-300 rounded text-gray-700">
              {skill.skill} ({skill.level}/5)
            </span>
          ))}
        </div>
      </section>

      <section className="py-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Education</h2>
        {resumeData.education.map((edu, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between">
              <h3 className="text-xl font-semibold text-gray-900">{edu.degree} | {edu.institute}</h3>
              <p className="text-gray-600">{edu.startDate} - {edu.endDate}</p>
            </div>
            <p className="text-gray-600 italic">{edu.location}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Template1;
