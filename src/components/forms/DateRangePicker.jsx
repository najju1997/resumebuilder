// src/components/DateRangePicker.js
import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateRangePicker = ({ startDate, endDate, onStartDateChange, onEndDateChange }) => {
  return (
    <div className="date-range-picker">
      <div>
        <label htmlFor="startDate">Start Date</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => onStartDateChange(date)}
          dateFormat="MM/yyyy"
          showMonthYearPicker
        />
      </div>
      <div>
        <label htmlFor="endDate">End Date</label>
        <DatePicker
          selected={endDate}
          onChange={(date) => onEndDateChange(date)}
          dateFormat="MM/yyyy"
          showMonthYearPicker
          minDate={startDate}  // Ensure end date cannot be before start date
        />
      </div>
    </div>
  );
};

export default DateRangePicker;
