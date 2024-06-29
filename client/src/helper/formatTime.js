import { differenceInMinutes, differenceInDays, differenceInHours } from 'date-fns';

const formatTime = (timestamp) => {
  const date = new Date(parseInt(timestamp, 10));
  const now = new Date();
  const minutes = differenceInMinutes(now, date) % 60;
  const hours = differenceInHours(now, date) % 24;
  const days = differenceInDays(now, date);

  if (days > 0) {
    return `${days}d ${hours}h`;
  } else  {
    return `${hours}h ${minutes}m`;
  } 
};

export default formatTime;
