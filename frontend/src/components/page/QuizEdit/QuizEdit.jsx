import React, { useEffect, useState } from 'react';
import {
  useParams,
  useNavigate
} from 'react-router-dom';
import APICall from '../../apis/APICall';
import Topbar from '../shared/Topbar/Topbar';
import styles from './QuizEdit.module.css';
import Button from '@mui/material/Button';
import PopupsForm from './components/PopupsForm/PopupsForm';
import QuestionList from './components/QuestionList/QuestionList';
// import QuestionTable from './components/QuestionTable/QuestionTable';

function QuizEdit () {
  const [fullQuizData, setFullQuizData] = useState(null);
  const [showPopups, setShowPopups] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // console.log(params.quizId)
    fetchData();
  }, [])

  const fetchData = async () => {
    const temp = await APICall('/admin/quiz/' + params.quizId, 'GET', null)
    setFullQuizData(temp)
  }

  return (
    <div className={styles.pageWrapper}>
      <Topbar />
      <div className={styles.contentWrapper}>
        <div className={styles.buttonsContainer}>
          <Button variant='contained' onClick={() => navigate('/dashboard')}>to dashboard</Button>
          <Button variant='contained' onClick={() => setShowPopups(true)}>add New Question</Button>
        </div>
        <div className={styles.tableWrapper}>
          <QuestionList fullQuizData={fullQuizData} />
        </div>
        {/* <div className={styles.tableWrapper}>
        <QuestionTable fullQuizData={fullQuizData} />
        </div> */}
      </div>

      {showPopups && <PopupsForm
        setShowPopups={setShowPopups}
        fetchedQuestions={fullQuizData.questions}
        setFullQuizData={setFullQuizData} />}
    </div>
  )
}
export default QuizEdit;
