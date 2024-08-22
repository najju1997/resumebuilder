const AdditionalSectionSelection = ({ availableSections, onAddSection, onBack }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Additional Sections</h2>
      <p className="mb-6">Select the sections you would like to add to your resume:</p>
      <div className="grid grid-cols-2 gap-4">
        {availableSections.map(section => (
          <div key={section.id} className="flex justify-between items-center p-4 border rounded">
            <span>{section.name}</span>
            <button onClick={() => onAddSection(section.id)} className="btn btn-primary">+</button>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-6">
        <button onClick={onBack} className="btn btn-secondary">Back</button>
        <button onClick={onBack} className="btn btn-primary">Next</button>
      </div>
    </div>
  );
};

export default AdditionalSectionSelection;
