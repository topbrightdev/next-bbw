export const truncate = (str, n = 175, useWordBoundary) => {
  if (str.length <= n) {
    return str;
  }
  const subString = str.substr(0, n - 1); // the original check
  return (useWordBoundary ? subString.substr(0, subString.lastIndexOf(" ")) : subString) + "...";
};
