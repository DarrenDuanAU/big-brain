export const numberToChar = (number) => {
  if (number >= 0 && number <= 25) {
    return String.fromCharCode(65 + number);
  } else {
    return null;
  }
};
