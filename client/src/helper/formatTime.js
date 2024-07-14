import { parseISO, differenceInMinutes, differenceInDays, differenceInHours } from 'date-fns';

// This function takes an ISO 8601 formatted timestamp and returns a formatted string
// representing the time difference from the current time in days and hours, or hours and minutes.
const formatTime = (isoTimestamp) => {
  // Parse the ISO 8601 formatted timestamp into a Date object.
  const date = parseISO(isoTimestamp);

  // Get the current date and time.
  const now = new Date();

  // Calculate the difference in minutes between the current time and the parsed date,
  // then get the remainder of minutes after dividing by 60.
  const minutes = differenceInMinutes(now, date) % 60;

  // Calculate the difference in hours between the current time and the parsed date,
  // then get the remainder of hours after dividing by 24.
  const hours = differenceInHours(now, date) % 24;

  // Calculate the difference in days between the current time and the parsed date.
  const days = differenceInDays(now, date);

  // If the difference in days is greater than 0, return a string in the format 'Xd Xh',
  // otherwise return a string in the format 'Xh Xm'.
  if (days > 0) {
    return `${days}d ${hours}h`;
  } else {
    return `${hours}h ${minutes}m`;
  }
};

export default formatTime;
