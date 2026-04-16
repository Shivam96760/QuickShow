// Format date (used in Dashboard, ListShows, etc.)
export const dateFormat = (date) => {
  return new Date(date).toLocaleString();
};

// Format duration (if needed anywhere else)
export const timeFormat = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const minutesRemainder = minutes % 60;
  return `${hours}h ${minutesRemainder}m`;
};