import React from 'react';
import styles from './QuizList.module.css';
import Quiz from './components/Quiz'

const QuizList = ({
  quizzesData
}) => {
  return (
    <div className={styles.container}>
      {quizzesData.map(quizData => <Quiz key={quizData.id} quizData={quizData} />)}
    </div>
  )
}
export default QuizList;
