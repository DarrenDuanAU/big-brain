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
function QuizEdit () {
  const [showPopups, setShowPopups] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(params.quizId)
    APICall('/admin/quiz/' + params.quizId, 'GET', null)
  }, [])

  return (
    <div>
      <Topbar />
      {showPopups && <PopupsForm setShowPopups={setShowPopups}/>}
      <div className={styles.container}>
      <Button variant='contained' onClick={() => navigate('/dashboard')}>to dashboard</Button>
        <br /> QuizEdit <br />
        <Button variant='contained' onClick={() => setShowPopups(true)}>add New Question</Button>
      </div>
    </div>
  )
}
export default QuizEdit;
