import { isAfter, parse } from 'date-fns';

/**
 * Validates if the end date is not before the start date.
 * 
 * @param {string} startDate - The start date in 'MMM yyyy' format.
 * @param {string} endDate - The end date in 'MMM yyyy' format.
 * @returns {boolean} - Returns true if endDate is valid, false otherwise.
 */
export const validateEndDate = (startDate, endDate) => {
  if (!startDate || !endDate) return true; // No validation needed if one of the dates is missing

  const start = parse(startDate, 'MMM yyyy', new Date());
  const end = parse(endDate, 'MMM yyyy', new Date());

  return isAfter(end, start) || start.getTime() === end.getTime(); // Valid if end date is after or equal to start date
};
