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
  const [showAddEditQuestionModal, setShowAddEditQuestionModal] = useState(false);
  const [targetQuestion, setTargetQuestion] = useState(null);
  const params = useParams();

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    const res = await APICall('/admin/quiz/' + params.quizId, 'GET', null)
    setFullQuizData(res)
  }

  const actionAddQuestionHandler = () => {
    setShowAddEditQuestionModal(true);
    setTargetQuestion(null);
  }

  return (
    <div className={styles.pageWrapper}>
      <Topbar />
      <div className={styles.contentWrapper}>
        <div className={styles.buttonsContainer}>
          <Button variant='contained' onClick={actionAddQuestionHandler}>add New Question</Button>
        </div>
        <div className={styles.tableWrapper}>
          <QuestionList
            setTargetQuestion ={setTargetQuestion}
            fullQuizData={fullQuizData}
            setShowAddEditQuestionModal={setShowAddEditQuestionModal}
            setFullQuizData={setFullQuizData}
            params={params}
          />
        </div>
      </div>

      {showAddEditQuestionModal && <AddEditQuestionModal
        targetQuestion = {targetQuestion}
        setVisible={setShowAddEditQuestionModal}
        fetchedQuestions={fullQuizData.questions}
        setFullQuizData={setFullQuizData} />}

    </div>
  )
}
export default QuizEdit;
