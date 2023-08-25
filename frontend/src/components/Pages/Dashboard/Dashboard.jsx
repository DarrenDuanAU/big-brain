import React, { useEffect, useState } from 'react';
import QuizList from './components/QuizList/QuizList';
import Topbar from './components/Topbar/Topbar';
import styles from './Dashboard.module.css';
import Button from '@mui/material/Button';
import APICall from '../../apis/APICall';
import PopupsForm from './components/PopupsForm/PopupsForm';

function Dashboard () {
  const [quizzesData, setQuizzesData] = useState([]);
  const [showNewQuizForm, setShowNewQuizForm] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await APICall('/admin/quiz', 'GET', null);
    console.log('dashboard print:', data);
    console.log('dashboard data.quizzes print:', data.quizzes);
    setQuizzesData(data.quizzes);
  };

  return (
    <div className={styles.container}>
      <Topbar />
      {/* {quizData.map(element => <p key={element.id}>{element.id}</p>)} */}
      <QuizList quizzesData={quizzesData}/>
      <Button variant='outlined' onClick={() => setShowNewQuizForm(!showNewQuizForm)}>Create New Quiz</Button>
      { showNewQuizForm &&
          <div className={styles.popups}>
            <PopupsForm setShowNewQuizForm={setShowNewQuizForm} />
          </div>
      }
    </div>
  )
}
export default Dashboard;
