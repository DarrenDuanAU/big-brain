import React from 'react';
import styles from './DropDown.module.css';

const DropDown = ({
  question,
  editQuestionHandler,
  deleteQuestionHandler
}
) => {
  // const [visible, setVisible] = useState(false);
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.actionButton}>
        <button>...</button>
      </div>
      <div className={styles.dropDownWrapper}>
          <button onClick={() => {
            editQuestionHandler(question);
            // setVisible(false);
          }}>edit</button>
          <button onClick={() => {
            deleteQuestionHandler(question.id);
            // setVisible(false);
          }}>delete</button>
      </div>
    </div>
  )
}
export default DropDown;
