import React from 'react';
function Linput ({
  option,
  questionInfo,
  setQuestionInfo,
}) {
  return (
    <div>
      <label htmlFor='x'>{option}: </label>
        <input
          type="text"
          name='x'
          value={questionInfo.option}
          onChange={(e) => {
            setQuestionInfo({
              ...questionInfo,
              option: e.target.value
            });
          }}
        />
    </div>
  )
}
export default Linput;
