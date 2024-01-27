import React, { useEffect, useState } from 'react';
import {
  useParams,
  useNavigate
} from 'react-router-dom';
import APICall from '../../apis/APICall';
import Topbar from '../shared/Topbar/Topbar';
import styles from './QuizEdit.module.css';
import Button from '@mui/material/Button';
import AddQuestionModal from './components/AddQuestionModal';
import QuestionTable from './components/QuestionTable/QuestionTable';

function QuizEdit () {
  const [fullQuizData, setFullQuizData] = useState(null);
  const [showAddEditQuestionModal, setShowAddEditQuestionModal] = useState(false);
  const [targetQuestion, setTargetQuestion] = useState(null);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuizData();
  }, [])

  const fetchQuizData = async () => {
    const res = await APICall('/admin/quiz/' + params.quizId, 'GET', null)
    setFullQuizData(res)
  }

  const addQuestionHandler = () => {
    setShowAddEditQuestionModal(true);
    setTargetQuestion(null);
  }

  return (
    <div className={styles.pageWrapper}>
      <Topbar />
      <div className={styles.toDashboardButtonContainer}>
        <Button variant='contained' onClick={() => navigate('/dashboard')}>to dashboard</Button>
      </div>
      <div className={styles.contentWrapper}>
        <div className={styles.tableWrapper}>
          <QuestionTable
            fullQuizData={fullQuizData}
            setFullQuizData={setFullQuizData}
            setShowAddEditQuestionModal={setShowAddEditQuestionModal}
            setTargetQuestion={setTargetQuestion}
            params={params}
             />
        </div>
        <div className={styles.buttonsContainer}>
          <Button variant='contained' onClick={addQuestionHandler}>add New Question</Button>
        </div>
      </div>
       {showAddEditQuestionModal &&
        <AddQuestionModal
          setVisible={setShowAddEditQuestionModal}
          fetchedQuestions={fullQuizData.questions}
          targetQuestion={targetQuestion}
          // setFullQuizData={setFullQuizData}
          />
        }
    </div>
  )
}
export default QuizEdit;
