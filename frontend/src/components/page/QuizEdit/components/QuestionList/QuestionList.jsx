import React from 'react'
import styles from './QuestionList.module.css';

const QuestionList = ({
  fullQuizData
}) => {
  return (
    <div className={styles.pageWrapper}>
      <table>
        <thead>
          <tr className={styles.tableHeaderRow}>
            <th className={styles.colOne}>Question</th>
            <th className={styles.colTwo}>Points</th>
            <th className={styles.colThree}>Time Limit</th>
            <th className={styles.colFour}>Choices</th>
          </tr>
        </thead>
        <tbody>
          {fullQuizData?.questions?.map((question, index) => (
          <tr key={index} className={styles.tableRow}>
            <td className={styles.colOne} >{question.str}</td>
            <td className={styles.colTwo}>{question.point} </td>
            <td className={styles.colThree}>{question.time} </td>
            <td className={styles.colFour} >{question.choice}</td>
          </tr>
          ))}
        </tbody>

      </table>
    </div>
  )
}
export default QuestionList;
