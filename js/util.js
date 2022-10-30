/* eslint-disable no-unused-vars */

function getRandomPositiveInteger (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function IsCorrectLength(string, maxLength) {
  return string.length <= maxLength;
}

export{getRandomPositiveInteger, IsCorrectLength};
