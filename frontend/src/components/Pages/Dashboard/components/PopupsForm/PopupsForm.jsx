import React from 'react';
import styles from './PopupsFrom.module.css';
import Button from '@mui/material/Button';
import APICall from '../../../../apis/APICall';

const PopupsForm = ({
  setShowNewQuizForm
}) => {
  const createQuiz = () => {
    APICall('/admin/quiz/new', 'POST', {
      name: 'my first quiz',
    })
    // fetchData();
  }

  return (
    <>
      <div className={styles.container} onClick={() => setShowNewQuizForm(false)}>
      </div>
      <div className={styles.box}>
      <p>popups!!</p>
      <Button variant='contained' onClick={createQuiz}>create</Button>
      </div>
    </>
  )
}
export default PopupsForm;
