export const IsValidQuestion = (question) => {
  if (
    isStrValid(question.str) ||
    isTimeValid(question.time) ||
    question.type === null ||
    isPointValid(question.point) ||
    !areChoicesValid(question.choice) ||
    !areAnswersValid(question.answer)
  ) {
    console.log('invalid question!');
    return false;
  }
  return true;
};

export const isStrValid = (str) => {
  return str !== '';
};

export const isTimeValid = (time) => {
  return time !== '';
};

export const isPointValid = (point) => {
  return point !== '';
};

export const areChoicesValid = (choices) => {
  return choices && !choices.some(choice => choice === '');
};

export const areAnswersValid = (answers) => {
  return answers && !answers.every(answer => answer === false);
};
