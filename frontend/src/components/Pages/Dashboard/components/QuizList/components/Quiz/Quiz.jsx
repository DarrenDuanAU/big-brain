import React from 'react';
import styles from './Quiz.module.css';
import Button from '@mui/material/Button';
import APICall from '../../../../../../apis/APICall';

const Quiz = ({
  quizData,
  setQuizzesData
}) => {
  const deleteQuiz = async () => {
    const res = await APICall('/admin/quiz/' + quizData.id, 'DELETE', null)
    if (res) {
      const data = await APICall('/admin/quiz', 'GET', null);
      setQuizzesData(data.quizzes)
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        Quiz Name: {quizData.name} <br />
        Quiz ID: {quizData.id} <br />
        Quiz Created at: {quizData.createdAt} <br />
      </div>
      <div>
        <Button variant='contained' onClick={deleteQuiz}>delete</Button>
      </div>
    </div>
  )
}
export default Quiz;
