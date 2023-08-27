import React, { useState } from 'react';
import styles from './PopupsFrom.module.css';
import Button from '@mui/material/Button';
import APICall from '../../.././../apis/APICall';
import Icon from '@mui/material/Icon';
import { useParams } from 'react-router-dom';
import { v4 } from 'uuid';

const PopupsForm = ({
  setShowPopups,
}) => {
  const [questionInfo, setQuestionInfo] = useState({
    id: '',
    str: '',
    time: '',
    type: '',
    point: '',
  });
  const params = useParams();

  const addQuestion = async () => {
    const randomId = v4();
    const questions = [
      {
        id: randomId,
        str: questionInfo.str,
        time: questionInfo.time,
        type: '',
        point: questionInfo.point,
      }
    ];

    const res = await APICall('/admin/quiz/' + params.quizId, 'PUT', {
      questions
    });
    if (res) {
      // const data = await APICall('/admin/quiz', 'GET', null);
      setShowPopups(false);
    }
  };

  return (
    <>
      <div className={styles.container} onClick={() => setShowPopups(false)}>
      </div>

      <div className={styles.box}>
        <div className={styles.topbar}>
          <div className={styles.crossIcon} onClick={() => setShowPopups(false)}>
            <Icon sx={{ fontSize: 30 }}>add_circle</Icon>
          </div>
        </div>

        <form>
          <div className={styles.form}>
            <label htmlFor='question-str'>Question: </label>
            <input
              type="text"
              name='question-str'
              value={questionInfo.str}
              onChange={(e) => {
                setQuestionInfo({
                  ...questionInfo,
                  str: e.target.value
                });
              }}
            />
            <label htmlFor='question-time'>Time Limit(s): </label>
            <input
              type="text"
              name='question-time'
              value={questionInfo.time}
              onChange={(e) => {
                setQuestionInfo({
                  ...questionInfo,
                  time: e.target.value
                });
              }}
            />
            <label htmlFor='question-point'>Points: </label>
            <input
              type="text"
              name='question-point'
              value={questionInfo.point}
              onChange={(e) => {
                setQuestionInfo({
                  ...questionInfo,
                  point: e.target.value
                });
              }}
            />
            {/* <input type="radio" value /> */}
            <Button variant='outlined' onClick={addQuestion}>
              create
            </Button>
          </div>
        </form>
        {/* <p>popups!!</p> */}
      </div>
    </>
  );
};

export default PopupsForm;
