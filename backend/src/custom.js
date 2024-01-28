/*
 For a given data structure of a question, produce another
 object that doesn't contain any important meta data (e.g. the answer)
 to return to a "player"
*/
export const quizQuestionPublicReturn = question => {
  console.log('See question: ', question);
  return question;
};

/*
 For a given data structure of a question, get the IDs of
 the correct answers (minimum 1).
*/
export const quizQuestionGetCorrectAnswers = question => {
  const answers = [];
  question.booleanAnswers.forEach((isAnswer, index) => {
    if (isAnswer) {
      answers.push(question.choices[index])
    }
  });
  console.log('answers',answers)
  return answers;

  // console.log('!!!!!! correct answer the question is !!!!!!:', question)
  // const tempList = [];
  // for (let i = 0; i < question.choice.length; i++) {
  //   // console.log('!!!!!! correct answer in the loop!!!!!!:', question.choice[i].id)
  //   if (question.choice[i].check === true){
  //     tempList.push(question.choice[i].id);
  //     // console.log('!!!!!! correct answer pushed in!!!!!!:', question.choice[i].id)
  //   }
  // }
  // // console.log('!!!!!! correct answer the tempList is !!!!!!:', tempList)
  // return tempList;
  // return ['3ff20949-20b9-499f-879f-c1bdc29bcf6f']; // For a single answer
};

/*
 For a given data structure of a question, get the IDs of
 all of the answers, correct or incorrect.
*/
export const quizQuestionGetAnswers = question => {
  console.log('!!!!!! all answer the question is !!!!!!:', question)
  const tempList = [];
  for (let i = 0; i < question.choice.length; i++) {
    // console.log('!!!!!! all answer in the loop!!!!!!:', question.choice[i].id)
    tempList.push(question.choice[i].id);
  }
  // console.log('!!!!!! all answer the tempList is !!!!!!:', tempList)
  return tempList;
  // return ['3ff20949-20b9-499f-879f-c1bdc29bcf6f','d7417954-9c00-4410-814a-8a674d38b299','66ec0f5a-a68d-4a62-9bf9-26da0a8c4867']; // For a single answer
};

/*
 For a given data structure of a question, get the duration
 of the question once it starts. (Seconds)
*/
export const quizQuestionGetDuration = question => {
  return question.time;
};
