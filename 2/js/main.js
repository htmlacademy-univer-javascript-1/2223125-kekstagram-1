function GenerateNumber(from, to) {
  if (from < 0 || from > to) {
    return 'Incorrect input';
  }
  return Math.random(from, to);
}

function IsCorrectLength(checkString, maxLength) {
  return checkString <= maxLength;
}
