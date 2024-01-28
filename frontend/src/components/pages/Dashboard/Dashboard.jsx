import React, { useEffect, useState } from 'react';
import QuizList from './components/QuizList/QuizList';
import Topbar from '../shared/Topbar/Topbar';
import styles from './Dashboard.module.css';
import APICall from '../../apis/APICall';

function Dashboard () {
  const [quizzesData, setQuizzesData] = useState([]);

  useEffect(() => {
    updateQuizzes();
  }, []);

  const updateQuizzes = async () => {
    const data = await APICall('/admin/quiz', 'GET', null);
    // console.log('dashboard print:', data);
    // console.log('dashboard data.quizzes print:', data.quizzes);
    setQuizzesData(data.quizzes)
  }

  return (
    <div className={styles.container}>
      <Topbar />
      <div className={styles.page}>
        <QuizList quizzesData={quizzesData} setQuizzesData={setQuizzesData} />
      </div>
    </div>
  )
}
export default Dashboard;
