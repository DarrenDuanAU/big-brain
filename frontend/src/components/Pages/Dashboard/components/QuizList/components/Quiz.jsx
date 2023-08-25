import React from 'react';
import styles from './Quiz.module.css';

const Quiz = ({
  quizData
}) => {
  return (
    <div className={styles.container}>
      {quizData.id} <br />
      {quizData.name} <br />
      {quizData.createdAt} <br />
      <hr />
    </div>
  )
}
export default Quiz;
