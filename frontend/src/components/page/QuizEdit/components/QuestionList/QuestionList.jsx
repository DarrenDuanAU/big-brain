import React from 'react'
const QuestionList = ({
  fullQuizData
}) => {
  return (
    <div>
      {fullQuizData?.questions?.map((question, index) => (
        <div key={index}>
          {/* Question ID: {question.id} <br /> */}
          Question: {question.str} <br />
          Question Points: {question.point} <br />
          Question Time Limits: {question.time} <br />
          Question choice: {question.choice} <br />
          <br />
          <hr />
        </div>
      ))}
    </div>
  )
}
export default QuestionList;
