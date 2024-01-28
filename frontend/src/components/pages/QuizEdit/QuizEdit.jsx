import React, { useEffect, useState } from 'react';
import {
  useParams,
  useNavigate
} from 'react-router-dom';
import APICall from '../../apis/APICall';
import Topbar from '../shared/Topbar/Topbar';
import styles from './QuizEdit.module.css';
import Button from '@mui/material/Button';
import AddEditQuestionModal from './components/AddEditQuestionModal';
import QuestionTable from './components/QuestionTable';

function QuizEdit () {
  const [questions, setQuestions] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [targetQuestion, setTargetQuestion] = useState(null);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuizData();
  }, [])

  const fetchQuizData = async () => {
    const res = await APICall('/admin/quiz/' + params.quizId, 'GET', null)
    setQuestions(res.questions)
  }

  const addQuestionHandler = () => {
    setShowModal(true);
    setTargetQuestion(null);
  }

  const toDashboardHandler = async () => {
    await APICall('/admin/quiz/' + params.quizId, 'PUT', {
      questions
    });
    navigate('/dashboard');
  }

  return (
    <div className={styles.pageWrapper}>
      <Topbar />
      <div className={styles.toDashboardButtonContainer}>
        <Button variant='contained' onClick={toDashboardHandler}>to dashboard</Button>
      </div>
      <div className={styles.contentWrapper}>
        <div className={styles.tableWrapper}>
          <QuestionTable
            questions={questions}
            setQuestions={setQuestions}
            setShowAddEditQuestionModal={setShowModal}
            setTargetQuestion={setTargetQuestion}
            params={params}
             />
        </div>
        <div className={styles.buttonsContainer}>
          <Button variant='contained' onClick={addQuestionHandler}>add New Question</Button>
        </div>
      </div>
       {showModal &&
        <AddEditQuestionModal
          setVisible={setShowModal}
          setQuestions={setQuestions}
          targetQuestion={targetQuestion}
          />
        }
    </div>
  )
}
export default QuizEdit;
