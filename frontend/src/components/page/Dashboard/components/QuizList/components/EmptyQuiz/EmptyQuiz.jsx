import React, { useState } from 'react';
import styles from './EmptyQuiz.module.css';
import Button from '@mui/material/Button';
import APICall from '../../../../../../apis/APICall';

// this component should have the similar style as the Quiz.jsx in QuizList Components
const EmptyQuiz = ({
  setQuizzesData
}) => {
  const [showNewQuizForm, setShowNewQuizForm] = useState(false);
  const [quizName, setQuizName] = useState('');

  const createQuiz = async () => {
    const res = await APICall('/admin/quiz/new', 'POST', {
      name: quizName,
    })
    if (res) {
      const data = await APICall('/admin/quiz', 'GET', null);
      setShowNewQuizForm(false);
      setQuizName('')
      setQuizzesData(data.quizzes);
    }
  }

  const clickCard = () => {
    if (!showNewQuizForm) {
      setShowNewQuizForm(true)
    }
  }

  return (
    <div className={styles.container} onClick={clickCard}>
      {showNewQuizForm === true
        ? <div className={styles.form}>
            <label htmlFor='quizname'>Quiz name: </label>
            <input type="text" name='quizname' value={quizName} onChange={(e) => setQuizName(e.target.value)}/>
            <div className={styles.buttons}>
              <Button variant='contained' onClick={createQuiz}>create</Button>
              <Button
                variant='outlined' onClick={() => {
                  setShowNewQuizForm(false)
                }}>
                  cancel
              </Button>
            </div>
          </div>
        : <div className={styles.plus}>
          <p>+</p>
        </div>
      }
    </div>
  )
}
export default EmptyQuiz;
