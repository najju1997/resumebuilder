// src/utils/dateValidation.js

import { isBefore, parse } from 'date-fns';

/**
 * Validates that the end date is not before the start date.
 * @param {string} startDate - The start date in 'MMM yyyy' format.
 * @param {string} endDate - The end date in 'MMM yyyy' format.
 * @returns {boolean} - True if the end date is valid, false otherwise.
 */
export const validateEndDate = (startDate, endDate) => {
  if (!startDate || !endDate || endDate === 'Present') return true;
  
  const start = parse(startDate, 'MMM yyyy', new Date());
  const end = parse(endDate, 'MMM yyyy', new Date());

  return !isBefore(end, start);
};

/**
 * Validates that the start date is not after the end date.
 * @param {string} startDate - The start date in 'MMM yyyy' format.
 * @param {string} endDate - The end date in 'MMM yyyy' format.
 * @returns {boolean} - True if the start date is valid, false otherwise.
 */
export const validateStartDate = (startDate, endDate) => {
  if (!startDate || !endDate || endDate === 'Present') return true;

  const start = parse(startDate, 'MMM yyyy', new Date());
  const end = parse(endDate, 'MMM yyyy', new Date());

  return !isBefore(end, start);
};
