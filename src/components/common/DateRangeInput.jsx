import { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { format, parse } from 'date-fns';
import { validateEndDate, validateStartDate } from '../../utils/dateValidation';

const DateRangeInput = ({ startDate, endDate, currentlyWorking, onDateChange }) => {
  const [dateError, setDateError] = useState(null);

  const handleDateChange = (date, field) => {
    const formattedDate = date ? format(date, 'MMM yyyy') : '';

    if (field === 'startDate' && endDate && endDate !== 'Present') {
      if (!validateStartDate(formattedDate, endDate)) {
        setDateError('Start date cannot be after end date.');
        return;
      } else {
        setDateError(null);
      }
    }

    if (field === 'endDate' && startDate && endDate !== 'Present') {
      if (!validateEndDate(startDate, formattedDate)) {
        setDateError('End date cannot be before start date.');
        return;
      } else {
        setDateError(null);
      }
    }

    onDateChange(formattedDate, field);
  };

  const handlePresentChange = (e) => {
    const isChecked = e.target.checked;
    onDateChange(isChecked ? 'Present' : '', 'endDate');
  };

  return (
    <div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Start Date</label>
        <DatePicker
          selected={startDate ? parse(startDate, 'MMM yyyy', new Date()) : null}
          onChange={(date) => handleDateChange(date, 'startDate')}
          dateFormat="MMM yyyy"
          showMonthYearPicker
          placeholderText="Select Start Date"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">End Date</label>
        <div className="flex items-center">
          <div className="flex-1">
            {!currentlyWorking && (
              <DatePicker
                selected={endDate && endDate !== 'Present' ? parse(endDate, 'MMM yyyy', new Date()) : null}
                onChange={(date) => handleDateChange(date, 'endDate')}
                dateFormat="MMM yyyy"
                showMonthYearPicker
                placeholderText="Select End Date"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            )}
            {currentlyWorking && (
              <input
                type="text"
                value="Present"
                readOnly
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-100"
              />
            )}
            {dateError && (
              <p className="text-red-500 text-sm mt-2">{dateError}</p>
            )}
          </div>
          <div className="ml-4">
            <label className="inline-flex items-center mt-1">
              <input
                type="checkbox"
                checked={currentlyWorking}
                onChange={handlePresentChange}
                className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
              />
              <span className="ml-2 text-gray-700">Present</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateRangeInput;
