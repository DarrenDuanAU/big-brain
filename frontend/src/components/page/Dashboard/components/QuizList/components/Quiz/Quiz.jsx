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
    <div className={styles.pageWrapper}>
      <div className={styles.info}>
        {/* Quiz ID: {quizData.id} <br /> */}
        <p className={styles.infoTitle}>Quiz Name: <br /></p>
        <p className={styles.infoQuizName}> {quizData.name} <br /></p>
        <p className={styles.infoDateTime}>{quizData.createdAt.split('T')[1].slice(0, 8) + ' / ' + quizData.createdAt.split('T')[0]} <br /></p>

      </div>
      <div className={styles.buttons}>
        <Button variant='outlined' onClick={editQuiz}>edit</Button>
        <Button variant='contained' onClick={deleteQuiz}>delete</Button>
      </div>
    </div>
  )
}
export default Quiz;
