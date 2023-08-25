import React, { useState } from 'react';
import styles from './PopupsFrom.module.css';
import Button from '@mui/material/Button';
import APICall from '../../../../apis/APICall';
import Icon from '@mui/material/Icon';

const PopupsForm = ({
  setShowNewQuizForm,
  setQuizzesData
}) => {
  const [quizName, setQuizName] = useState('');

  const createQuiz = async () => {
    const res = await APICall('/admin/quiz/new', 'POST', {
      name: quizName,
    })
    if (res) {
      const data = await APICall('/admin/quiz', 'GET', null);
      setShowNewQuizForm(false);
      setQuizzesData(data.quizzes);
    }
  }

  return (
    <>
      <div className={styles.container} onClick={() => setShowNewQuizForm(false)}>
      </div>
      <div className={styles.box}>
        <div className={styles.topbar}>
          <div className={styles.crossIcon} onClick={() => setShowNewQuizForm(false)}>
            <Icon sx={{ fontSize: 30 }}>add_circle</Icon>
          </div>
        </div>
        <form >
          <div className={styles.form}>
              <label htmlFor='quizname'>Quiz name: </label>
              <input type="text" name='quizname' value={quizName} onChange={(e) => setQuizName(e.target.value)}/>
            <Button variant='outlined' onClick={createQuiz}>create</Button>
          </div>
        </form>
      {/* <p>popups!!</p> */}
      </div>
    </>
  )
}
export default PopupsForm;
