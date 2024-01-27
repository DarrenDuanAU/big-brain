import React, { useEffect, useState } from 'react';
import styles from './AddEditQuestionModal.module.css';
import Button from '@mui/material/Button';
import APICall from '../../../../apis/APICall';
import Icon from '@mui/material/Icon';
import { useParams } from 'react-router-dom';
import { v4 } from 'uuid';
// import {
//   IsValidQuestion
// } from '../../service';

const AddEditQuestionModal = ({
  targetQuestion,
  setVisible,
  fetchedQuestions,
  setFullQuizData
}) => {
  const choicesIndex = ['A', 'B', 'C', 'D'];
  const [questionInfo, setQuestionInfo] = useState({
    id: '',
    str: '',
    time: '',
    type: '',
    point: '',
    choices: ['', '', '', ''],
    answers: [false, false, false, false],
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
        choices: targetQuestion.choices,
        answers: targetQuestion.answers,
      })
    }
  }, [])

  const addQeustion = async () => {
    // if (!IsValidQuestion(questionInfo.str)) {
    //   return;
    // }
    const randomId = v4();
    const questions = [
      ...fetchedQuestions,
      {
        id: randomId,
        str: questionInfo.str,
        time: questionInfo.time,
        type: questionInfo.type,
        point: questionInfo.point,
        choices: questionInfo.choices,
        answers: questionInfo.answers,
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
        choices: questionInfo.choices,
        answers: questionInfo.answers,
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
    <div className={styles.pageWrapper}>
      <div className={styles.background} onClick={() => setVisible(false)}>
      </div>

      <div className={styles.modalWrapper}>
        <div className={styles.topbar}>
          <div className={styles.crossIcon} onClick={() => setVisible(false)}>
            <Icon sx={{ fontSize: 30 }}>add_circle</Icon>
          </div>
        </div>

        <form>
          <div className={styles.headerWrapper}>
            {targetQuestion === null
              ? <h2>Create a Question</h2>
              : <h2>Edit the Question</h2>
            }
          </div>
          <div className={styles.formWrapper}>

            <div className={styles.questionStrWrapper}>
              <label htmlFor='question-str'>Question: </label>
              <textarea
                name='question-str'
                autoComplete='off'
                value={questionInfo.str}
                onChange={(e) => {
                  setQuestionInfo({
                    ...questionInfo,
                    str: e.target.value
                  });
                }}
              />
            </div>

            <div className={styles.pointWrapper}>
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
            </div>

            <div className={styles.timeWrapper}>
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
            </div>

            <div className={styles.typesWrapper}>
              <p>Question type:</p>
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

            <div className={styles.choicesWrapper} >
              <p>Choices:</p>
              {choicesIndex.map((value, index) =>
                <div key={index} className={styles.choice}>
                  <label htmlFor='choice'>{value}.  </label>
                  <input
                    type="text" name='choice' autoComplete='off'
                    value={questionInfo.choices[index]}
                    onChange={(e) => {
                      const updatedChoice = [...questionInfo.choices];
                      updatedChoice[index] = e.target.value;
                      setQuestionInfo({
                        ...questionInfo,
                        choices: updatedChoice
                      });
                    }}
                  />
                  <div className={styles.checkboxWrapper}>
                    <input type="checkbox"
                      checked={questionInfo.answers[index]}
                      onChange={(e) => {
                        const updatedAnswer = [...questionInfo.answers];
                        updatedAnswer[index] = e.target.checked;
                        setQuestionInfo({
                          ...questionInfo,
                          answers: updatedAnswer
                        })
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className={styles.bottomButtonWrapper}>
              {targetQuestion === null
                ? <Button variant='outlined' onClick={addQeustion}>create</Button>
                : <Button variant='outlined' onClick={updateEditQuestion}>submit</Button>
              }
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditQuestionModal;
