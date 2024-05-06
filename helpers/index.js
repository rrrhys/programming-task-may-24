const sortByCountDescending = (a, b) => {
  const aCount = a[1];
  const bCount = b[1];
  if (aCount < bCount) return 1;
  if (aCount > bCount) return -1;
  return 0;
};

module.exports = {
  sortByCountDescending,
};
