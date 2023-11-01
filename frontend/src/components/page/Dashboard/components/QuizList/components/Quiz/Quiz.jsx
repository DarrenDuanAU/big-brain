import React, { useState } from 'react';
import styles from './Quiz.module.css';
import Button from '@mui/material/Button';
import APICall from '../../../../../../apis/APICall';
import {
  useNavigate
} from 'react-router-dom';
import SessionModal from './components/SessionModal';

const Quiz = ({
  quizData,
  setQuizzesData
}) => {
  const [sessionModalVisible, setSessionModalVisible] = useState(false);
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

  const startSession = async () => {
    const res = await APICall('/admin/quiz/' + quizData.id + '/start', 'POST', null)
    if (res) {
      setSessionModalVisible(true);
      console.log(res)
    }
  }

  const endSession = async () => {
    const res = await APICall('/admin/quiz/' + quizData.id + '/end', 'POST', null)
    if (res) {
      console.log(res)
    }
  }

  const advanceSession = async () => {
    const res = await APICall('/admin/quiz/' + quizData.id + '/advance', 'POST', null)
    if (res) {
      console.log(res)
    }
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
        <Button variant='outlined' onClick={startSession}>start</Button>
        <Button variant='outlined' onClick={editQuiz}>edit</Button>
        <Button variant='contained' onClick={deleteQuiz}>delete</Button>
      </div>
      {sessionModalVisible &&
        <SessionModal setVisible={setSessionModalVisible} advanceSession={advanceSession} endSession={endSession}/>
      }
    </div>
  )
}
export default Quiz;
