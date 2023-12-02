import React from 'react'
import styles from './QuestionList.module.css';
import APICall from '../../../../apis/APICall';
import DropDown from './components/DropDown';

const QuestionList = ({
  setTargetQuestion,
  fullQuizData,
  setFullQuizData,
  setShowAddEditQuestionModal,
  params
}) => {
  const numberToChar = (number) => {
    if (number >= 0 && number <= 25) {
      return String.fromCharCode(65 + number);
    } else {
      return null;
    }
  }

  const editQuestionHandler = (question) => {
    setTargetQuestion(question);
    setShowAddEditQuestionModal(true);
  }

  const deleteQuestionHandler = async (targetId) => {
    const questions = fullQuizData?.questions?.filter(question => question.id !== targetId);
    const res = await APICall('/admin/quiz/' + params.quizId, 'PUT', {
      questions
    });
    if (res) {
      const temp = await APICall('/admin/quiz/' + params.quizId, 'GET', null)
      setFullQuizData(temp);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <table>
        <thead>
          <tr className={styles.tableHeaderRow}>
            <th className={styles.colOne}>Question</th>
            <th className={styles.colTwo}>Points</th>
            <th className={styles.colThree}>Time&nbsp;(s)</th>
            <th className={styles.colFour}>Choices</th>
            <th className={styles.colFive}>Answers</th>
            <th className={styles.colSix}>Action</th>
          </tr>
        </thead>
        <tbody>
          {fullQuizData?.questions?.map((question, index) => (
          <tr key={index} className={styles.tableRow}>
            <td className={styles.colOne} >{
              question.str.length < 80
                ? question.str
                : question.str.substring(0, 80) + '......'
            }
            </td>
            <td className={styles.colTwo}>{question.point} </td>
            <td className={styles.colThree}>{question.time} </td>
            <td className={styles.colFour} >{question.choices.map((item, index) => (numberToChar(index) + ': ' + item)).join(' / ')}</td>
            <td className={styles.colFive} >{question.answers.map((isAnswer, index) => {
              if (isAnswer) {
                return numberToChar(index);
              }
              return null
            }).filter((choices) => choices != null).join('/')
            }</td>
            <td className={styles.colSix}>
              <DropDown
                question={question}
                editQuestionHandler={editQuestionHandler}
                deleteQuestionHandler={deleteQuestionHandler}
              />
              {/* <button onClick={() => { editQuestionHandler(question) }}>edit</button>
              <button onClick={() => { deleteQuestionHandler(question.id) }}>delete</button> */}
            </td>
          </tr>
          ))}
        </tbody>

      </table>
    </div>
  )
}
export default QuestionList;
