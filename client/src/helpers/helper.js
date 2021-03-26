//Takes two objects that have data property
export const compareByDate = (a, b) => {
  if (a.date > b.date) return -1;
  if (a.date < b.date) return 1;
  if (a.date === b.date) return 0;
};
