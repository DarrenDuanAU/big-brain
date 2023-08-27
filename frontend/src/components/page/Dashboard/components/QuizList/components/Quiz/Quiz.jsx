import React from 'react';
import styles from './Quiz.module.css';
import Button from '@mui/material/Button';
import APICall from '../../../../../../apis/APICall';
import {
  useNavigate
} from 'react-router-dom';

const Quiz = ({
  quizData,
  setQuizzesData
}) => {
  const navigate = useNavigate();

  const deleteQuiz = async () => {
    const res = await APICall('/admin/quiz/' + quizData.id, 'DELETE', null)
    if (res) {
      const data = await APICall('/admin/quiz', 'GET', null);
      setQuizzesData(data.quizzes)
    }
  }

  const editQuiz = () => {
    navigate('/QuizEdit/' + quizData.id)
  }
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        Quiz Name: {quizData.name} <br />
        Quiz ID: {quizData.id} <br />
        Quiz Created at: {quizData.createdAt} <br />
      </div>
      <div className={styles.buttons}>
        <Button variant='outlined' onClick={editQuiz}>edit</Button>
        <Button variant='contained' onClick={deleteQuiz}>delete</Button>
      </div>
    </div>
  )
}
export default Quiz;
