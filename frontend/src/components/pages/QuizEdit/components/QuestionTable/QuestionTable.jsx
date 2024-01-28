import React from 'react'
import styles from './QuestionTable.module.css';
import DropDown from './components/DropDown';
import { numberToChar } from '../../../../service';

const QuestionTable = ({
  setTargetQuestion,
  questions,
  setQuestions,
  setShowAddEditQuestionModal,
  params
}) => {
  const editQuestionHandler = (question) => {
    setTargetQuestion(question);
    setShowAddEditQuestionModal(true);
  }

  const deleteQuestionHandler = async (targetId) => {
    setQuestions(prevQuestions => {
      const newQuestions = prevQuestions?.filter(question => question.id !== targetId);
      return newQuestions
    })
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
          {questions?.map((question, index) => (
          <tr key={index} className={styles.tableRow}>
            <td className={styles.colOne} >{
              question.str.length < 80
                ? question.str
                : question.str.substring(0, 80) + '......'
            }
            </td>
            <td className={styles.colTwo}>{question.points} </td>
            <td className={styles.colThree}>{question.time} </td>
            <td className={styles.colFour} >{question.choices.map((item, index) => (numberToChar(index) + ': ' + item)).join(' / ')}</td>
            <td className={styles.colFive} >{question.booleanAnswers.map((isAnswer, index) => {
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
            </td>
          </tr>
          ))}
        </tbody>

      </table>
    </div>
  )
}
export default QuestionTable;
