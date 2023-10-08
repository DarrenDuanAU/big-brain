import React from 'react'
import styles from './QuestionList.module.css';

const QuestionList = ({
  setTargetQuestion,
  fullQuizData,
  setShowAddEditQuestionModal
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
            <td className={styles.colFour} >{question.choice.map((item, index) => (numberToChar(index) + ': ' + item)).join(' / ')}</td>
            <td className={styles.colFive} >{question.answer.map((isAnswer, index) => {
              if (isAnswer) {
                return numberToChar(index);
              }
              return null
            }).filter((choice) => choice != null).join('/')
            }</td>
            <td className={styles.colSix}>
              <button onClick={() => { editQuestionHandler(question) }}>edit</button>
            </td>
          </tr>
          ))}
        </tbody>

      </table>
    </div>
  )
}
export default QuestionList;
