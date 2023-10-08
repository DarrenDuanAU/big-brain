import React, { useEffect, useState } from 'react';
import styles from './AddEditQuestionModal.module.css';
import Button from '@mui/material/Button';
import APICall from '../../../../apis/APICall';
import Icon from '@mui/material/Icon';
import { useParams } from 'react-router-dom';
import { v4 } from 'uuid';

const AddEditQuestionModal = ({
  targetQuestion,
  setVisible,
  fetchedQuestions,
  setFullQuizData
}) => {
  const choiceIndex = ['A', 'B', 'C', 'D'];
  const [questionInfo, setQuestionInfo] = useState({
    id: '',
    str: '',
    time: '',
    type: '',
    point: '',
    choice: ['', '', '', ''],
    answer: [false, false, false, false],
  });
  const params = useParams();

  useEffect(() => {
    if (targetQuestion !== null) {
      setQuestionInfo({
        id: targetQuestion.id,
        str: targetQuestion.str,
        time: targetQuestion.time,
        type: targetQuestion.type,
        point: targetQuestion.point,
        choice: targetQuestion.choice,
        answer: targetQuestion.answer,
      })
    }
  }, [])

  const addQeustion = async () => {
    const randomId = v4();
    const questions = [
      ...fetchedQuestions,
      {
        id: randomId,
        str: questionInfo.str,
        time: questionInfo.time,
        type: questionInfo.type,
        point: questionInfo.point,
        choice: questionInfo.choice,
        answer: questionInfo.answer,
      }
    ];
    const res = await APICall('/admin/quiz/' + params.quizId, 'PUT', {
      questions
    });
    if (res) {
      setVisible(false);
      const temp = await APICall('/admin/quiz/' + params.quizId, 'GET', null)
      setFullQuizData(temp);
    }
  };

  const updateEditQuestion = async () => {
    const filteredQuestion = fetchedQuestions.filter(question => question.id !== targetQuestion.id);
    const questions = [
      ...filteredQuestion,
      {
        id: questionInfo.id,
        str: questionInfo.str,
        time: questionInfo.time,
        type: questionInfo.type,
        point: questionInfo.point,
        choice: questionInfo.choice,
        answer: questionInfo.answer,
      }
    ];
    const res = await APICall('/admin/quiz/' + params.quizId, 'PUT', {
      questions
    });
    if (res) {
      setVisible(false);
      const temp = await APICall('/admin/quiz/' + params.quizId, 'GET', null)
      setFullQuizData(temp);
    }
  };

  return (
    <>
      <div className={styles.container} onClick={() => setVisible(false)}>
      </div>

      <div className={styles.box}>
        <div className={styles.topbar}>
          <div className={styles.crossIcon} onClick={() => setVisible(false)}>
            <Icon sx={{ fontSize: 30 }}>add_circle</Icon>
          </div>
        </div>

        <form>
          <div className={styles.form}>
            <label htmlFor='question-str'>Question: </label>
            <input
              type="text" name='question-str' autoComplete='off'
              value={questionInfo.str}
              onChange={(e) => {
                setQuestionInfo({
                  ...questionInfo,
                  str: e.target.value
                });
              }}
            />
            <label htmlFor='question-point'>Points: </label>
            <input
              type="text" name='question-point' autoComplete='off'
              value={questionInfo.point}
              onChange={(e) => {
                setQuestionInfo({
                  ...questionInfo,
                  point: e.target.value
                });
              }}
            />
            <label htmlFor='question-time'>Time Limit(s): </label>
            <input
              type="text" name='question-time' autoComplete='off'
              value={questionInfo.time}
              onChange={(e) => {
                setQuestionInfo({
                  ...questionInfo,
                  time: e.target.value
                });
              }}
            />
            <p>Question type:</p>
            <div className={styles.types}>
              <div className={styles.type}>
                <input
                  type="radio" name='type' id='single' autoComplete='off'
                  value='single' checked={questionInfo.type === 'single'}
                  onChange={(e) =>
                    setQuestionInfo({
                      ...questionInfo,
                      type: e.target.value
                    })
                  }
                />
                <label htmlFor="single">single</label>
              </div>
              <div className={styles.type}>
                <input type="radio" name='type' id='multiple' autoComplete='off'
                  value='multiple' checked={questionInfo.type === 'multiple'}
                  onChange={(e) =>
                    setQuestionInfo({
                      ...questionInfo,
                      type: e.target.value
                    })
                  }
                />
                <label htmlFor="multiple">multiple</label>
              </div>
            </div>

            {choiceIndex.map((value, index) =>
              <div key={index} className={styles.choice}>
                <label htmlFor='choice'>{value}.  </label>
                <input
                  type="text" name='choice' autoComplete='off'
                  value={questionInfo.choice[index]}
                  onChange={(e) => {
                    const updatedChoice = [...questionInfo.choice];
                    updatedChoice[index] = e.target.value;
                    setQuestionInfo({
                      ...questionInfo,
                      choice: updatedChoice
                    });
                  }}
                />
                <div className={styles.checkBox}>
                  <input type="checkbox"
                    checked={questionInfo.answer[index]}
                    onChange={(e) => {
                      const updatedAnswer = [...questionInfo.answer];
                      updatedAnswer[index] = e.target.checked;
                      setQuestionInfo({
                        ...questionInfo,
                        answer: updatedAnswer
                      })
                    }}
                  />
                </div>
              </div>
            )}

            {targetQuestion === null
              ? <Button variant='outlined' onClick={addQeustion}>create</Button>
              : <Button variant='outlined' onClick={updateEditQuestion}>Edit</Button>
            }
          </div>
        </form>
      </div>
    </>
  );
};

export default AddEditQuestionModal;
