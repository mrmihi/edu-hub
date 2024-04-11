export const createEnum = (constantArray) =>
  constantArray.reduce((acc, val) => {
    acc[val] = val;
    return acc;
  }, {});
