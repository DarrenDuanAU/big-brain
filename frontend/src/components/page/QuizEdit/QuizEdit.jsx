import React, { useEffect, useState } from 'react';
import {
  useParams,
} from 'react-router-dom';
import APICall from '../../apis/APICall';
import Topbar from '../shared/Topbar/Topbar';
import styles from './QuizEdit.module.css';
import Button from '@mui/material/Button';
import AddEditQuestionModal from './components/AddEditQuestionModal/AddEditQuestionModal';
import QuestionList from './components/QuestionList/QuestionList';

function QuizEdit () {
  const [fullQuizData, setFullQuizData] = useState(null);
  const [showPopups, setShowPopups] = useState(false);
  const params = useParams();

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    const res = await APICall('/admin/quiz/' + params.quizId, 'GET', null)
    setFullQuizData(res)
  }

  return (
    <div className={styles.pageWrapper}>
      <Topbar />
      <div className={styles.contentWrapper}>
        <div className={styles.buttonsContainer}>
          <Button variant='contained' onClick={() => setShowPopups(true)}>add New Question</Button>
        </div>
        <div className={styles.tableWrapper}>
          <QuestionList fullQuizData={fullQuizData} setShowPopups={setShowPopups}/>
        </div>
      </div>

      {showPopups && <AddEditQuestionModal
        setShowPopups={setShowPopups}
        fetchedQuestions={fullQuizData.questions}
        setFullQuizData={setFullQuizData} />}
    </div>
  )
}
export default QuizEdit;
