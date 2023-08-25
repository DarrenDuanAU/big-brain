import React from 'react';
import styles from './QuizList.module.css';
import EmptyQuiz from './components/EmptyQuiz/EmptyQuiz';
import Quiz from './components/Quiz/Quiz';

const QuizList = ({
  quizzesData,
  setQuizzesData,
}) => {
  return (
    <div className={styles.container}>
      <EmptyQuiz setQuizzesData={setQuizzesData}/>
      {quizzesData.map(quizData => (
        <Quiz
          key={quizData.id}
          quizData={quizData}
          setQuizzesData={setQuizzesData}
        />
      ))}
    </div>
  )
}
export default QuizList;
